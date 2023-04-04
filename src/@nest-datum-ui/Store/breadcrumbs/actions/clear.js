import { storeDispatch } from '../../Store.js';

export const fireClear = (id, defaultPayload = {}) => async (prefix = 'breadcrumbs') => await storeDispatch(prefix, prefix +'.clear', { 
	payload: { 
		id,
		defaultPayload, 
	}, 
});

export const reducerClear = (state, action) => {
	return {
		...state,
		...state[action.payload.id]
			? {
				[action.payload.id]: {
					loader: false,
					data: [],
				},
			}
			: {},
	};
};
