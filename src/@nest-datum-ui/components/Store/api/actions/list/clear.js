import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListClear = (id) => async (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.listClear',
		payload: {
			id,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListClear = (state, action) => {
	return ({
		...state,
		...state.list[action.payload.id]
			? {
				list: {
					...state.list,
					[action.payload.id]: {
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
					},
				},
			}
			: {},
	});
};
