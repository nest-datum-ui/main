import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireClear = () => async (prefix = 'auth') => {
	Store().dispatch({
		type: prefix +'.clear',
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerClear = (state, action) => {
	return ({
		loader: false,
		authFlag: undefined,
		errors: {},
	});
};
