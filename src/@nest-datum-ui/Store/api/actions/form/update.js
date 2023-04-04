import axios from 'axios';
import {
	strUrl as utilsCheckStrUrl,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { 
	urlApiStr as utilsFormatUrlApiStr,
	httpErrorMessage as utilsFormatHttpErrorMessage, 
} from '@nest-datum-utils/format';
import { getStore } from '../../../Store.js';
import { hookSnackbar } from '../../../snackbar/hooks';
import { fireFormProp } from './prop.js';

export const fireFormUpdate = (storeName, options = {}) => async (prefix = 'api') => {
	const processedUrl = `${options.apiUrl}${options.entityId ? ('/'+ options.entityId) : ''}`;

	if (utilsCheckStrUrl(storeName)) {
		throw new Error(`Can't update api store form. Property storeName "${storeName}" is not valid.`);
	}
	await fireFormProp(storeName, 'loader', true)();

	let data = { ...(((getStore()
		.getState()[prefix] || {})
		.form || {})[storeName] || {}) };

	if (utilsCheckArr(options.excludeFromFetchPayload)) {
		options.excludeFromFetchPayload.forEach((key) => {
			delete data[key];
		});
	}
	try {
		delete data['loader'];
		delete data['errors'];

		if (!utilsCheckStrUrl(processedUrl)) {
			throw new Error(`Can't update api store form. Property apiUrl "${processedUrl}" is not valid.`);
		}
		await axios.patch(utilsFormatUrlApiStr(processedUrl), data);

		hookSnackbar('Entity successfully updated.', { variant: 'success' });
		
		return setTimeout(() => fireFormProp(storeName, 'loader', false)(), 0);
	}
	catch (err) {
		fireFormProp(storeName, 'loader', false)();

		throw new Error(utilsFormatHttpErrorMessage(err, processedUrl));
	}
};
