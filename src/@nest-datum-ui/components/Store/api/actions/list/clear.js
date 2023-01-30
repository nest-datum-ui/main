import Store from '@nest-datum-ui/components/Store';

export const fireListClear = (storeListName) => async (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.listClear',
		payload: {
			storeListName,
		},
	});
};

export const reducerListClear = (state, action) => ({
	...state,
	...state.list[action.payload.storeListName]
		? {
			list: {
				...state.list,
				[action.payload.storeListName]: {
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
		}
		: {},
});
