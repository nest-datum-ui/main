import { objFilled as utilsCheckObjFilled } from '@nest-datum-utils/check';
import { 
	storeDispatch,
	getStore, 
} from '../../../Store.js';
import { fireListProp } from '../list/prop.js';
import { fireFormMerge } from './merge.js';
import hookLastPathItem from '../../../url/hooks/hookLastPathItem.js';
import hookPrevPathItem from '../../../url/hooks/hookPrevPathItem.js';

export const fireFormDropOnCurrentPage = (storeName, redirect = false) => async (prefix = 'api') => {
	const formData = ((getStore()
		.getState()
		.api || {})
		.form || {})[storeName];

	if (!utilsCheckObjFilled(formData)) {
		throw new Error(`Can't drop api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (formData.isDeleted) {
		await storeDispatch(prefix, prefix +'.formDrop', {
			payload: {
				name: storeName,
			},
		});
			
		if (redirect) {
			const urlId = hookLastPathItem();

			if (urlId === formData.id) {
				window.location.href = hookPrevPathItem();
			}
		}
	}
	else {
		fireFormMerge(storeName, { isDeleted: true, loader: false })();
		fireListProp(storeName, 'loader', false)();
	}
};
