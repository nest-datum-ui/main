import axios from 'axios';
import {
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strUrl as utilsCheckStrUrl,
	strFilled as utilsCheckStrFilled,
	obj as utilsCheckObj,
	func as utilsCheckFunc,
} from '@nest-datum-utils/check';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { hookNavigate } from '../../../url/hooks';
import { 
	storeDispatch,
	getStore, 
} from '../../../Store.js';
import hookPrevPathItem from '../../../url/hooks/hookPrevPathItem.js';
import { fireFormProp } from './prop.js';
import { fireFormCreateFile } from './createFile.js';

export const fireFormCreate = (storeName, options = {}) => async (callback = () => {}, prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't create api store form. Property storeName "${storeName}" is not valid.`);
	}
	const redirect = options.redirect ?? false;
	const mergeData = utilsCheckObj(options.mergeData)
		? options.mergeData
		: {};
	
	await fireFormProp(storeName, 'loader', true)();

	let data = { 
			...(((getStore()
				.getState()[prefix] || {})
				.form || {})[storeName] || {}), 
			...mergeData,
			callback,
		},
		payload,
		newId;

	delete data['fetched'];
	delete data['loader'];
	delete data['errors'];

	if (!utilsCheckStrUrl(options.apiUrl)) {
		return await storeDispatch(prefix, prefix +'.formCreate', {
			payload: data,
		});
	}
	const { formData, filesResponses } = await fireFormCreateFile(data)();

	if (storeName !== process.env.URL_API_FILES_FILE) {
		const request = await axios.post(utilsFormatUrlApiStr(options.apiUrl), formData);
			
		newId = request.data.id;

		return await storeDispatch(prefix, prefix +'.formCreate', {
			payload: {
				storeName,
				newId,
				url: options.apiUrl,
				data: request.data,
				redirect,
				callback,
			},
		});
	}
	return {
		payload,
		filesResponses,
	};
};

export const reducerFormCreate = (state, action) => {
	if (!utilsCheckObj(action.payload.storeName)) {
		state.form[process.env.URL_API_FILES_FILE] = {
			loader: false,
			errors: {},
		};
	}
	if (utilsCheckStr(action.payload.storeName)) {
		state.form[action.payload.storeName] = {
			...state.form[action.payload.storeName],
			...(action.payload['data'] || {}),
		};
	}
	if (utilsCheckFunc(action.payload.callback)) {
		setTimeout(() => {
			action.payload.callback(action.payload.storeName, state, action);

			if (action.payload.redirect && utilsCheckStrId(action.payload.newId)) {
				utilsCheckStrFilled(action.payload.redirect)
					? hookNavigate(action.payload.redirect)
					: hookNavigate(`${hookPrevPathItem()}/${action.payload.newId}`, true);
			}
		}, 1000);
	}
	return { ...state };
};
