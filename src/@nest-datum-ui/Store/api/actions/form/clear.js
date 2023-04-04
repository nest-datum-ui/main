import {
	strId as utilsCheckStrId,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireFormClear = (storeName, defautPayload = {}) => async (prefix = 'api') => {
	if (!utilsCheckObj(defautPayload)) {
		throw new Error(`Can't clear api store form. Property defautPayload "${defautPayload}" is not valid.`);
	}
	return await storeDispatch(prefix, prefix +'.formClear', { payload: { storeName, defautPayload } });
};

export const reducerFormClear = (state, action) => {
	return {
		...state,
		form: {
			...state.form,
			...utilsCheckStrId(action.payload.storeName)
				? ({
					[action.payload.storeName]: {
						loader: false,
						errors: {},
						...action.payload.defautPayload,
					},
				})
				: ({
					0: {
						loader: false,
						errors: {},
						...action.payload.defautPayload,
					},
				}),
		},
	};
};
