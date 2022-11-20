import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Menu ID
 * @return {Function}
 */
export const fireClose = (id) => async (prefix = 'menu') => {
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
	if (state[action.payload]) {
		delete state[action.payload];
		return ({ 
			...state,
			_updater: state._updater + 1, 
		});
	}
	else {
		return ({ 
			_updater: state._updater + 1, 
		});
	}
};
