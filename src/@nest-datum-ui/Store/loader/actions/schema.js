import { storeDispatch } from '../../Store.js';
import { reducerSchema as mainReducerSchema } from '../../main/actions/schema.js';

export const fireSchema = () => async (prefix = 'loader') => await storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return ({
		...mainReducerSchema(state, action),
		window: {
			visible: true,
		},
	});
};
