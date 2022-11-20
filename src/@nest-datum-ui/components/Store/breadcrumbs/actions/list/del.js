import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListDel = (id, index) => (prefix = 'breadcrumbs') => {
	Store().dispatch({
		type: prefix +'.listDel',
		payload: {
			id, 
			index,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListDel = (state, action) => {
	if (state.list[action.payload.id]
		&& typeof state.list[action.payload.id] === 'object'
		&& !Array.isArray(state.list[action.payload.id])
		&& Array.isArray(state.list[action.payload.id].data)
		&& action.payload.index >= 0) {
		state.list[action.payload.id].data = state
			.list[action.payload.id]
			.data
			.splice(0, action.payload.index);
	}
	return ({ ...state });
};
