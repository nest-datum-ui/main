import { storeDispatch } from '../../Store.js';

export const fireClose = (id) => async (prefix = 'dialog') => await storeDispatch(prefix, prefix +'.close', { payload: { id } });

export const reducerClose = (state, action) => {
	action.payload.id
		? (delete state[action.payload.id])
		: (state = {});
	
	return { ...state };
};
