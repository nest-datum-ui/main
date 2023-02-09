import Store from '@nest-datum-ui/components/Store';
import axios from 'axios';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { hookSnackbar } from '@nest-datum-ui/utils/hooks';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireFormProp as actionApiFormProp } from './prop.js';
import { fireFormDropOnCurrentPage as actionApiFormDropOnCurrentPage } from './dropOnCurrentPage.js';
import { fireFormDropOnList as actionApiFormDropOnList } from './dropOnList.js';

export const fireFormDrop = (urlOrStoreFormName, entityId, options) => async (prefix = 'api') => {
	const snackbar = hookSnackbar();
	let allowInsecureDeletion = false,
		notRedirect = false,
		sliceInList = false,
		forceUpdate = false;

	if (utilsCheckObj(options)) {
		allowInsecureDeletion = !!(options.allowInsecureDeletion ?? false);
		notRedirect = !!(options.notRedirect ?? false);
		sliceInList = !!(options.sliceInList ?? false);
		forceUpdate = !!(options.forceUpdate ?? false);
	}

	if (utilsCheckStrUrl(urlOrStoreFormName)) {
		try {
			if (!sliceInList) {
				await actionApiListProp(urlOrStoreFormName, 'loader', true)();
			}
			await actionApiFormProp(urlOrStoreFormName, 'loader', true)();
			await axios.delete(utilsUrlWithToken(`${urlOrStoreFormName}/${entityId}`));

			if (!allowInsecureDeletion) {
				actionApiFormDropOnCurrentPage(urlOrStoreFormName, notRedirect)();
				actionApiFormDropOnList(urlOrStoreFormName, entityId, sliceInList)();
			}
			else if (forceUpdate) {
				Store().dispatch({
					type: prefix +'.formDrop',
					payload: {
						name: urlOrStoreFormName,
					},
				});
			}
			actionDialogClose(urlOrStoreFormName)();
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), `${urlOrStoreFormName}/${entityId}`), { variant: 'error' });
			actionApiFormProp(urlOrStoreFormName, 'loader', false)();
			actionApiListProp(urlOrStoreFormName, 'loader', false)();
		}
	}
};

export const reducerFormDrop = (state, action) => {
	if (utilsCheckObj(state.form[action.payload.name])) {
		delete state.form[action.payload.name];
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
