import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListSet = (id, data) => (prefix = 'breadcrumbs') => {
	Store().dispatch({
		type: prefix +'.listSet',
		payload: {
			id,
			data,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListSet = (state, action) => {
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
	state.list[action.payload.id].data = action.payload.data;
	state.list[action.payload.id].data = [ ...state.list[action.payload.id].data ];

	return ({ ...state });
};
