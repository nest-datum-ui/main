import { storeDispatch } from '../../Store.js';
import { reducerSchema as mainReducerSchema } from '../../main/actions/schema.js';

const STORE_DEFAULT_FORM_NAME = 0;
const STORE_DEFAULT_LIST_NAME = 0;

export const fireSchema = () => async (prefix = 'api') => await storeDispatch(prefix, prefix +'.schema');

export const reducerSchema = (state, action) => {
	return {
		...mainReducerSchema(state, action),
		form: {
			[STORE_DEFAULT_FORM_NAME]: {
				errors: {},
				loader: false,
			},
		},
		list: {
			[STORE_DEFAULT_LIST_NAME]: {
				selected: [],
				relations: {},
				filter: {},
				sort: {},
				errors: {},
				loader: false,
				page: 1,
				limit: 20,
				total: 0,
				query: '',
				data: null,
			},
		},
	};
};
