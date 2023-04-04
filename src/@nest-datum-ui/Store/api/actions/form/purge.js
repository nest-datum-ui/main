import { storeDispatch } from '../../../Store.js';

export const fireFormPurge = (storeName) => async (prefix = 'api') => await storeDispatch(prefix, prefix +'.formPurge', { payload: { storeName } })

export const reducerFormPurge = (state, action) => {
	delete state.form[action.payload.storeName];

	return {
		...state,
		form: {
			...state.form,
		},
	};
};
