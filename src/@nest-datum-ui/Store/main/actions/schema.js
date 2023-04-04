import { storeDispatch } from '../../Store.js';

export const fireSchema = () => async (prefix = 'main') => storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return {
		storeName: (action || {}).prefix || 'main',
		storeCreatedAt: new Date(),
		storeUpdatedAt: new Date(),
	};
};
