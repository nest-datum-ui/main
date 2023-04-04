import axios from 'axios';
import {
	strUrl as utilsCheckStrUrl,
	obj as utilsCheckObj,
	objHttpNotFound as utilsCheckObjHttpNotFound,
} from '@nest-datum-utils/check';
import { 
	urlApiStr as utilsFormatUrlApiStr,
	httpErrorMessage as utilsFormatHttpErrorMessage, 
} from '@nest-datum-utils/format';
import { storeDispatch } from '../../../Store.js';
import hookPrevPathItem from '../../../url/hooks/hookPrevPathItem.js';
import { hookNavigate } from '../../../url/hooks';
import { fireFormProp } from './prop.js';

export const fireFormGet = (storeName, options = {}) => async (callback = () => {}, prefix = 'api') => {
	if (options.apiUrl === undefined && options.entityId === undefined) {
		return await storeDispatch(prefix, prefix +'.formGet', {
			payload: {
				storeName,
				callback,
				...(options['data'] || {}),
			},
		});
	}
	const processedUrl = `${options.apiUrl}${options.entityId ? ('/'+ options.entityId) : ''}`;
	const redirectIfError = !!options.redirectIfError;

	if (!utilsCheckStrUrl(processedUrl)) {
		throw new Error(`Can't get api store form. Property processedUrl "${processedUrl}" is not valid.`);
	}
	if (!options.disableLoader) {
		await fireFormProp(storeName, 'loader', true)();
	}
	try {
		return await storeDispatch(prefix, prefix +'.formGet', {
			payload: {
				storeName,
				redirectIfError,
				url: processedUrl,
				data: (await axios(utilsFormatUrlApiStr(processedUrl))).data,
				callback,
			},
		});
	}
	catch (err) {
		if (redirectIfError && utilsCheckObjHttpNotFound(err)) {
			return hookNavigate(hookPrevPathItem());
		}
		fireFormProp(processedUrl, 'loader', false)();

		throw new Error(utilsFormatHttpErrorMessage(err, processedUrl));
	}
};

export const reducerFormGet = (state, action) => {
	if (!utilsCheckObj(state.form[action.payload.storeName])) {
		state.form[action.payload.storeName] = {};
	}
	state.form[action.payload.storeName] = {
		...(state.form[action.payload.storeName] || {}),
		loader: false,
		fetched: true,
		errors: {},
		...(action.payload.data || {}),
	};

	setTimeout(() => action.payload.callback(state.form[action.payload.storeName]), 0);

	return { ...state };
};
