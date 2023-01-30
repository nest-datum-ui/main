import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { hookSnackbar } from '@nest-datum-ui/utils/hooks';
import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireFormProp as actionApiFormProp } from './prop.js';

export const fireFormRestore = (url, entityId) => async (callback = () => {}, prefix = 'api') => {
	const snackbar = hookSnackbar();

	if (utilsCheckStrUrl(url)) {
		try {
			await actionApiFormProp(url, 'loader', true)();
			await actionApiListProp(url, 'loader', true)();
			await axios.patch(utilsUrlWithToken(`${url}/${entityId}`), { isDeleted: false });

			const formData = ((Store()
				.getState()
				.api || {})
				.form || {})[url];
			const listData = (((Store()
				.getState()
				.api || {})
				.list || {})[url] || {})
				.data || [];
			const entityIndex = listData.findIndex((item) => item.id === entityId);

			if (utilsCheckObj(formData)) {
				actionApiFormProp(url, 'isDeleted', false)();
				actionApiFormProp(url, 'loader', false)();
			}
			if (entityIndex >= 0) {
				actionApiListProp(url, 'data', false, [ entityIndex, 'isDeleted' ])();
				actionApiListProp(url, 'loader', false)();
			}
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), `${url}/${entityId}`), { variant: 'error' });
			actionApiFormProp(url, 'loader', false)();
			actionApiListProp(url, 'loader', false)();
		}
	}
};
