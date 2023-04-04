import { storeDispatch } from '../../Store.js';

export const fireSchema = () => async (prefix = 'dialog') => await storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return{};
};
