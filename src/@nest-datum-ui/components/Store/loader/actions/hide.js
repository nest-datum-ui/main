import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Loader id
 * @return {Function}
 */
export const fireHide = (id) => async (prefix = 'loader') => {
	Store().dispatch({
		type: prefix +'.hide',
		payload: id,
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerHide = (state, action) => {
	const loaderKey = ((typeof action.payload === 'string' && action.payload)
		|| typeof action.payload === 'number')
		? action.payload
		: 'window';

	return ({
		...state,
		[loaderKey]: {
			progressPercentage: -1,
			text: '',
			visible: false,
		},
		_updater: state._updater + 1,
	});
};
