import { storeDispatch } from '../../Store.js';

export const fireUpdate = (payload = {}) => async (prefix = 'main') => storeDispatch(prefix, prefix +'.update', payload);

export const reducerUpdate = (state, action) => {
	return {
		...state,
		...action.payload,
		storeName: action.prefix,
		storeUpdatedAt: new Date(),
	};
};
