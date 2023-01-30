import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Loader id
 * @return {Function}
 */
export const fireProp = (id, name, value) => async (prefix = 'loader') => {
	Store().dispatch({
		type: prefix +'.show',
		payload: {
			id,
			name,
			value,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerProp = (state, action) => {
	const loaderKey = ((typeof action.payload.id === 'string' && action.payload.id)
		|| typeof action.payload.id === 'number')
		? action.payload.id
		: 'window';

	return ({
		...state,
		[loaderKey]: {
			...(state[loaderKey] || {}),
			[action.payload.name]: action.payload.value,
		},
	});
};
