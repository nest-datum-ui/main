import Store from '@nest-datum-ui/components/Store';

/**
 * @param {object} payload - Data for merging with current state
 * @return {Function}
 */
export const fireUpdate = (payload = {}) => async (prefix = 'main') => {
	Store().dispatch({
		type: prefix +'.update',
		payload: payload,
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerUpdate = (state, action) => {
	return {
		...state,
		...action.payload,
	};
};
