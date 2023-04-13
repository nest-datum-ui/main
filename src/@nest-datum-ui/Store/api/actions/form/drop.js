import axios from 'axios';
import {
	strUrl as utilsCheckStrUrl,
	obj as utilsCheckObj,
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { storeDispatch } from '../../../Store.js';
import { fireClose } from '../../../dialog/actions/close.js';
import { fireListProp } from '../list/prop.js';
import { fireFormProp } from './prop.js';
import { fireFormDropOnCurrentPage } from './dropOnCurrentPage.js';
import { fireFormDropOnList } from './dropOnList.js';

export const fireFormDrop = (storeName, options = {}) => async (callback = () => {}, prefix = 'api') => {
	let apiUrlArr = [],
		type = options.type || 'form';

	if (utilsCheckArrFilled(options.ids)) {
		apiUrlArr = options.ids.map((entityId) => `${options.apiUrl}/${entityId}`);
		type = 'list';
	}
	else {
		apiUrlArr.push(`${options.apiUrl}${options.entityId ? ('/'+ options.entityId) : ''}`);
	}
	const allowInsecureDeletion = !!(options.allowInsecureDeletion ?? false);
	const redirect = !!(options.redirect ?? false);
	const forceUpdate = !!(options.forceUpdate ?? false);

	if (utilsCheckStrUrl(storeName)) {
		throw new Error(`Can't create api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (!utilsCheckStrUrl(apiUrlArr[0])) {
		throw new Error(`Can't get api store form. Property apiUrl "${apiUrlArr[0]}" is not valid.`);
	}
	try {
		if (options.dialogId) {
			await fireClose(options.dialogId)();
		}
		else {
			await fireClose('disable')();
			await fireClose('disable-many')();
			await fireClose('drop')();
			await fireClose('drop-many')();
			await fireClose('drop-force')();
		}
		(type === 'form')
			? await fireFormProp(storeName, 'loader', true)()
			: await fireListProp(storeName, 'loader', true)();
		(apiUrlArr.length > 1)
			? await axios.delete(utilsFormatUrlApiStr(options.apiUrl, { ids: options.ids }))
			: await axios.delete(utilsFormatUrlApiStr(apiUrlArr[0]));

		if (!allowInsecureDeletion && (options.entityId || options.ids)) {
			(type === 'form')
				? await fireFormDropOnCurrentPage(storeName, redirect)()
				: await fireFormDropOnList({ storeName, ...options })();
		}
		else if (forceUpdate) {
			await storeDispatch(prefix, prefix +'.formDrop', {
				payload: {
					name: storeName,
				},
			});
		}
		setTimeout(() => callback(), 0);
	}
	catch (err) {
		(type === 'form')
			? await fireFormProp(storeName, 'loader', false)()
			: await fireListProp(storeName, 'loader', false)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrlArr[0]));
	}
};

export const reducerFormDrop = (state, action) => {
	if (utilsCheckObj(state.form[action.payload.name])) {
		delete state.form[action.payload.name];
	}
	return {
		...state,
		form: {
			...state.form,
		},
	};
};
