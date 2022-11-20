import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Menu ID
 * @param {object} acnhorNode - Node element for opening menu
 * @return {Function}
 */
export const fireOpen = (id, acnhorNode) => async (prefix = 'menu') => {
	Store().dispatch({
		type: prefix +'.open',
		payload: {
			id,
			acnhorNode,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerOpen = (state, action) => {
	return ({ 
		...state,
		[action.payload.id]: action.payload.acnhorNode,
		_updater: state._updater + 1,
	});
};
