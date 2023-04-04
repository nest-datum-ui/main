import axios from 'axios';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { 
	str as utilsCheckStrUrl,
	obj as utilsCheckObj, 
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { getStore } from '../../../Store.js';
import { fireListProp } from '../list/prop.js';
import { fireListMerge } from '../list/merge.js';
import { fireFormProp } from './prop.js';
import { fireFormMerge } from './merge.js';

export const fireFormRestore = (storeName, options = {}) => async (callback = () => {}, prefix = 'api') => {
	let apiUrlArr = [],
		type = options.type || 'form';

	if (utilsCheckArrFilled(options.ids)) {
		apiUrlArr = options.ids.map((entityId) => `${options.apiUrl}/${entityId}`);
		type = 'list';
	}
	else {
		apiUrlArr.push(`${options.apiUrl}${options.entityId ? ('/'+ options.entityId) : ''}`);
		options['ids'] = [ options.entityId ];
	}
	if (!utilsCheckStrUrl(apiUrlArr[0])) {
		throw new Error(`Can't restore api store form. Property apiUrl "${apiUrlArr[0]}" is not valid.`);
	}
	(type === 'form')
		? await fireFormProp(storeName, 'loader', true)()
		: await fireListProp(storeName, 'loader', true)();
	let i = 0;

	while (i < apiUrlArr.length) {
		await axios.patch(utilsFormatUrlApiStr(apiUrlArr[i]), { isDeleted: false });
		i++;
	}
	if (type === 'form') {
		const formData = ((getStore().getState().api || {}).form || {})[storeName];

		if (utilsCheckObj(formData)) {
			setTimeout(() => fireFormMerge(storeName, { isDeleted: false, loader: false })(), 0);
		}
	}
	else {
		const listData = (((getStore().getState().api || {}).list || {})[storeName] || {}).data || [];
		let i = 0;

		while (i < options.ids.length) {
			const entityId = options.ids[i];
			const entityIndex = listData.findIndex((item) => item.id === entityId);

			if (entityIndex >= 0) {
				listData[entityIndex]['isDeleted'] = false;
			}
			i++;
		}
		fireListMerge(storeName, {
			data: [ ...listData ],
			selected: [],
			selectedForDrop: [],
			selectedForDropPermanently: [],
		})();
		setTimeout(() => fireListProp(storeName, 'loader', false)(), 0);
	}
};
