import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireRemove = () => async (prefix = 'main') => {
	Store().dispatch({
		type: prefix +'.remove',
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerRemove = (state, action) => {
	return {};
};
