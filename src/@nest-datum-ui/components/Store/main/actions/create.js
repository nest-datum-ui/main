import Store from '@nest-datum-ui/components/Store';

/**
 * @param {object} payload - Data for adding to store
 * @return {Function}
 */
export const fireCreate = (payload = {}) => async (prefix = 'main') => {
	Store().dispatch({
		type: prefix +'.create',
		payload,
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerCreate = (state, action) => {
	return action.payload;
};
