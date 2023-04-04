import { storeDispatch } from '../../../Store.js';

export const fireFormMerge = (storeFormName, data = {}) => async (callback = () => {}, prefix = 'api') => {
	return await storeDispatch(prefix, prefix +'.formMerge', {
		payload: {
			storeFormName,
			data,
			callback,
		},
	});
};

export const reducerFormMerge = (state, action) => { 
	setTimeout(() => action.payload.callback(state, action), 0);

	return {
		...state,
		form: {
			...state.form,
				[action.payload.storeFormName]: {
				...(state.form[action.payload.storeFormName] || {}),
				...(action.payload.data || {}),
			},
		},
	}; 
};
