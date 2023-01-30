import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsUrlLevelUp from '@nest-datum-ui/utils/url/levelUp.js';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import {
	hookSnackbar,
	hookNavigate,
} from '@nest-datum-ui/utils/hooks';
import { FILES_PATH_MANAGER_FILE_ONE } from '@nest-datum-ui-lib/files/consts/path.js';
import { fireFormProp as actionApiFormProp } from './prop.js';
import { fireFormCreateFile as actionApiFormCreateFile } from './createFile.js';

export const fireFormCreate = (storeFormNameOrUrl, options) => async (callback = () => {}, prefix = 'api') => {
	const snackbar = hookSnackbar();
	const navigate = hookNavigate();

	if (utilsCheckStrUrl(storeFormNameOrUrl)) {
		try {
			let notRedirect,
				url = storeFormNameOrUrl;

			if (utilsCheckObj(options)) {
				notRedirect = Boolean(options.notRedirect ?? false);
				url = utilsCheckStr(options.path)
					? options.path
					: storeFormNameOrUrl;
			}
			else {
				notRedirect = Boolean(options);
			}

			await actionApiFormProp(storeFormNameOrUrl, 'loader', true)();

			let data = { ...(((Store()
				.getState()[prefix] || {})
				.form || {})[storeFormNameOrUrl] || {}) },
				payload,
				newId;

			delete data['loader'];
			delete data['errors'];

			const {
				formData,
				filesResponses,
			} = await actionApiFormCreateFile(data)(snackbar);

			if (storeFormNameOrUrl !== FILES_PATH_MANAGER_FILE_ONE) {
				const request = await axios.post(utilsUrlWithToken(url), formData);
				
				newId = request.data.id;
				payload = {
					url: storeFormNameOrUrl,
					newId,
					data: request.data,
				};
				Store().dispatch({
					type: prefix +'.formCreate',
					payload,
				});
			}
			else {
				payload = {
					url: storeFormNameOrUrl,
				};
				Store().dispatch({
					type: prefix +'.formCreate',
					payload,
				});
			}
			callback(payload, filesResponses, Store().getState()[prefix]);

			if (!notRedirect && utilsCheckStrId(newId)) {
				navigate(`${utilsUrlLevelUp()}/${newId}`);
			}
			return {
				payload,
				filesResponses,
			};
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), storeFormNameOrUrl), { variant: 'error' });
			actionApiFormProp(storeFormNameOrUrl, 'loader', false)();
		}
	}
};

export const reducerFormCreate = (state, action) => {
	if (!utilsCheckObj(action.payload.url)) {
		state.form[FILES_PATH_MANAGER_FILE_ONE] = {
			loader: false,
			errors: {},
		};
	}
	if (utilsCheckStr(action.payload.url)) {
		state.form[action.payload.url] = {
			...state.form[action.payload.url],
			...(action.payload['data'] || {}),
		};
	}
	return { ...state };
};
