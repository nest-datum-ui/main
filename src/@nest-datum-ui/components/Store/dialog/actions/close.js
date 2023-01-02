import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Dialog ID
 * @return {Function}
 */
export const fireClose = (id) => async (prefix = 'dialog') => {
	Store().dispatch({
		type: prefix +'.close',
		payload: id,
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerClose = (state, action) => {
	delete state[action.payload];
	return ({ 
		...state, 
	});
};
