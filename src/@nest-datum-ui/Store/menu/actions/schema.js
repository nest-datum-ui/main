import { storeDispatch } from '../../Store.js';
import { reducerSchema as mainReducerSchema } from '../../main/actions/schema.js';

export const fireSchema = () => async (prefix = 'menu') => await storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return mainReducerSchema(state, action);
};
