import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListClear = (id) => (prefix = 'breadcrumbs') => {
	Store().dispatch({
		type: prefix +'.listClear',
		payload: {
			id,
		}
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
		list: state.list[action.payload.id]
			? {
				...state.list,
				[action.payload.id]: {
					loader: false,
					data: [],
				},
			}
			: {
				app: {
					loader: false,
					data: [{
						key: '/',
						text: '...',
					}],
				},
			},
	});
};
