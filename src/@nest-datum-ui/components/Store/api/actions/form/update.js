import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { hookSnackbar } from '@nest-datum-ui/utils/hooks';
import { fireFormProp as actionApiFormProp } from './prop.js';

export const fireFormUpdate = (storeFormNameOrUrl, options) => async (prefix = 'api') => {
	const snackbar = hookSnackbar();

	if (utilsCheckStrUrl(storeFormNameOrUrl)) {
		await actionApiFormProp(storeFormNameOrUrl, 'loader', true)();

		let data = { ...(((Store()
			.getState()[prefix] || {})
			.form || {})[storeFormNameOrUrl] || {}) },
			url;

		try {
			if (utilsCheckObj(options)) {
				url = options.path;

				if (utilsCheckArr(options.excludeFromFetchPayload)) {
					options.excludeFromFetchPayload.forEach((key) => {
						delete data[key];
					});
				}
			}
			else {
				url = `${storeFormNameOrUrl}/${options}`;
			}
			delete data['loader'];
			delete data['errors'];

			await axios.patch(utilsUrlWithToken(url), data);

			snackbar('Entity successfully updated.', { variant: 'success' });
			actionApiFormProp(storeFormNameOrUrl, 'loader', false)();
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), url), { variant: 'error' });
			actionApiFormProp(storeFormNameOrUrl, 'loader', false)();
		}
	}
};

export const reducerFormUpdate = (state, action) => {
	if (utilsCheckObj(state.form[action.payload.url])) {
		state.form[action.payload.url] = {
			...state.form[action.payload.url],
			loader: false,
			errors: {},
			...(action.payload || {}),
		};
	}
	return { 
		...state,
		form: {
			...state.form,
		}, 
	};
};
