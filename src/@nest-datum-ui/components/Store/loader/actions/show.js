import Store from '@nest-datum-ui/components/Store';

/**
 * @param {string|number} id - Loader id
 * @return {Function}
 */
export const fireShow = (id) => async (progressPercentage, text, prefix = 'loader') => {
	Store().dispatch({
		type: prefix +'.show',
		payload: {
			id,
			progressPercentage,
			text,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerShow = (state, action) => {
	const loaderKey = ((typeof action.payload.id === 'string' && action.payload.id)
		|| typeof action.payload.id === 'number')
		? action.payload.id
		: 'window';

	return ({
		...state,
		[loaderKey]: {
			progressPercentage: 0,
			text: '',
			...action.payload,
			visible: true,
		},
		_updater: state._updater + 1,
	});
};
