import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireProp = (propName, propValue) => (prefix = 'auth') => {
	Store().dispatch({
		type: prefix +'.prop',
		payload: {
			propName, 
			propValue,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerProp = (state, action) => {
	state[action.payload.propName] = action.payload.propValue;

	return ({ ...state });
};
