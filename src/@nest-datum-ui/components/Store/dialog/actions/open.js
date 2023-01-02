import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Dialog ID
 * @param {object} data - Data for used in dialog
 * @return {Function}
 */
export const fireOpen = (id, data = {}) => async (prefix = 'dialog') => {
	Store().dispatch({
		type: prefix +'.open',
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
export const reducerOpen = (state, action) => {
	return ({ 
		...state, 
		[action.payload.id]: action.payload.data,
	});
};
