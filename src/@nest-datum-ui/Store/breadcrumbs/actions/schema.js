import { storeDispatch } from '../../Store.js';

export const fireSchema = () => async (prefix = 'breadcrumbs') => await storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return ({
		// example: {
		// 	loader: false,
		// 	data: [{
		// 		key: '/',
		// 		text: '...',
		// 	}],
		// },
	});
};
