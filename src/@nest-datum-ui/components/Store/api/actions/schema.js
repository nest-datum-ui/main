import Store from '@nest-datum-ui/components/Store';

const DEFAULT_KEY = 0;

export const fireSchema = () => async (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.schema',
	});
};

export const reducerSchema = (state, action) => {
	return ({
		form: {
			[DEFAULT_KEY]: {
				loader: false,
				errors: {},
			},
		},
		list: {
			[DEFAULT_KEY]: {
				loader: false,
				page: 1,
				limit: 20,
				total: 0,
				query: '',
				filter: {},
				sort: {},
				relations: {},
				data: null,
				errors: {},
				selected: [],
			},
		},
	});
};
