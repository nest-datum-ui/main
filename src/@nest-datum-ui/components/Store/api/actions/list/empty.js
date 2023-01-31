import Store from '@nest-datum-ui/components/Store';

export const fireListEmpty = (storeFormName, structure) => (callback = () => {}, prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.listEmpty',
		payload: {
			storeFormName,
			structure,
		},
	});
	callback(Store().getState()[prefix] || {});
};

export const reducerListEmpty = (state, action) => ({ 
	...state,
	list: {
		...state.list,
		[action.payload.storeFormName]: {
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
			...(action.payload.structure || {}),
		},
	}, 
});
