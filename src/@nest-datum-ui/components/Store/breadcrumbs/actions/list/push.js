import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListPush = (id, data = {}) => (prefix = 'breadcrumbs') => {
	Store().dispatch({
		type: prefix +'.listPush',
		payload: {
			id,
			...data,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListPush = (state, action) => {
	if (!state.list[action.payload.id]
		|| typeof state.list[action.payload.id] !== 'object'
		|| Array.isArray(state.list[action.payload.id])) {
		state.list[action.payload.id] = {
			data: [],
		};
	}
	if (!Array.isArray(state.list[action.payload.id].data)) {
		state.list[action.payload.id].data = [];
	}
	state.list[action.payload.id].data.push(action.payload);
	state.list[action.payload.id].data = [ ...state.list[action.payload.id].data ];

	return ({ ...state });
};
