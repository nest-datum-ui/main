import { storeDispatch } from '../../Store.js';
import { reducerSchema as mainReducerSchema } from '../../main/actions/schema.js';
import { reducerUpdate as mainReducerUpdate } from '../../main/actions/update.js';

export const fireClose = (id) => async (prefix = 'menu') => await storeDispatch(prefix, prefix +'.close', { payload: id });

export const reducerClose = (state, action) => {
	if (state[action.payload]) {
		delete state[action.payload];
		
		return mainReducerUpdate(state, action);
	}
	return mainReducerSchema(state, action);
};
