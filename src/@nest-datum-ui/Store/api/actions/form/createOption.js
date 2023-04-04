import { v4 as uuidv4 } from 'uuid';
import {
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { getStore } from '../../../Store.js';
import { fireListProp } from '../list/prop.js';

export const fireFormCreateOption = async (storeName, {
	id,
	relation,
	relationContent,
}) => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't create api store form. Property storeName "${storeName}" is not valid.`);
	}
	const data = (((getStore().getState().api || {}).list || {})[storeName] || {}).data;

	if (utilsCheckArr(data)) {
		const optionDataIndex = data.findIndex((item) => item.id === id);

		if (utilsCheckArr(data[optionDataIndex][relation])
			&& utilsCheckObj(data[optionDataIndex][relation][0])
			&& utilsCheckArr(data[optionDataIndex][relation][0][relationContent])) {
			
			data[optionDataIndex][relation][0][relationContent].push({
				...data[optionDataIndex][relation][0][relationContent][0],
				content: '',
				id: uuidv4(),
			});
			data[optionDataIndex][relation][0][relationContent] = [
				...data[optionDataIndex][relation][0][relationContent],
			];
			data[optionDataIndex][relation][0] = {
				...data[optionDataIndex][relation][0],
			};
			data[optionDataIndex] = { ...data[optionDataIndex] };

			fireListProp(storeName, 'data', [ ...data ])();
		}
	}
};
