import Store from '@nest-datum-ui/components/Store';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsUrlLevelUp from '@nest-datum-ui/utils/url/levelUp.js';
import utilsUrlLast from '@nest-datum-ui/utils/url/last.js';
import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireFormProp as actionApiFormProp } from './prop.js';

export const fireFormDropOnCurrentPage = (storeFormName, notRedirect = false) => (prefix = 'api') => {
	const formData = ((Store()
		.getState()
		.api || {})
		.form || {})[storeFormName];

	if (utilsCheckObj(formData)) {
		if (formData.isDeleted) {
			Store().dispatch({
				type: prefix +'.formDrop',
				payload: {
					name: storeFormName,
				},
			});
			
			if (!notRedirect) {
				const urlId = utilsUrlLast();

				if (urlId === formData.id) {
					window.location.href = utilsUrlLevelUp();
				}
			}
		}
		else {
			actionApiFormProp(storeFormName, 'isDeleted', true)();
			actionApiFormProp(storeFormName, 'loader', false)();
			actionApiListProp(storeFormName, 'loader', false)();
		}
	}
};
