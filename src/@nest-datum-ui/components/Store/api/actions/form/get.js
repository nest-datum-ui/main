import { v4 as uuidv4 } from 'uuid';
import {
	hookNavigate,
	hookSnackbar,
} from '@nest-datum-ui/utils/hooks';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckFunc from '@nest-datum-ui/utils/check/func';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckObjAxiosErrNotFound from '@nest-datum-ui/utils/check/obj/axios/err/notFound.js';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsUrlLevelUp from '@nest-datum-ui/utils/url/levelUp.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { fireFormProp as actionApiFormProp } from './prop.js';
import { fireFormCreateLoop as actionApiFormCreateLoop } from './loop.js';

const request = async ({
	prefix,
	url,
	processedUrl,
	entityId,
	notRedirect = false,
}) => {
	const snackbar = hookSnackbar();
	const navigate = hookNavigate();

	try {
		Store().dispatch({
			type: prefix +'.formGet',
			payload: {
				url: processedUrl,
				entityId,
				data: (await axios(utilsUrlWithToken(utilsCheckFunc(url)
					? url()
					: `${url}/${entityId}`))).data,
			},
		});
		return processedUrl;
	}
	catch (err) {
		if (!notRedirect && utilsCheckObjAxiosErrNotFound(err)) {
			navigate(utilsUrlLevelUp());
		}
		else {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), utilsCheckFunc(url)
				? url()
				: `${url}/${entityId}`), { variant: 'error' });
			actionApiFormProp(processedUrl, 'loader', false)();
		}
	}
};

export const fireFormGet = (url, options) => async (prefix = 'api') => {
	const processedUrl = utilsCheckFunc(url)
		? url()
		: url;
	let entityId,
		withLoop,
		notRedirect;

	if (utilsCheckObj(options)) {
		entityId = options.entityId;
		withLoop = !!options.withLoop;
		notRedirect = !!options.notRedirect;
	}
	else {
		entityId = options;
		withLoop = false;
		notRedirect = false;
	}
	if (utilsCheckEntityExists(entityId)) {
		if (utilsCheckStrUrl(processedUrl)) {
			await actionApiFormProp(processedUrl, 'loader', true)();

			if (withLoop) {
				actionApiFormCreateLoop(processedUrl)(() => request({
					prefix,
					url,
					processedUrl,
					entityId,
					notRedirect,
				}));
			}
			else {
				request({
					prefix,
					url,
					processedUrl,
					entityId,
					notRedirect,
				})
			}
		}
		else {
			const storeName = uuidv4();

			Store().dispatch({
				type: prefix +'.formGet',
				payload: {
					id: storeName,
					entityId,
				},
			});

			return storeName;
		}
	}
};

export const reducerFormGet = (state, action) => {
	if (utilsCheckStrUrl(action.payload.url)) {
		state.form[action.payload.url] = {
			...(state.form[action.payload.url] || state.form['0'] || {}),
			loader: false,
			errors: {},
			...(action.payload.data || {}),
		};

		return {
			...state,
			form: {
				...state.form,
			},
		};
	}
	return state;
};
