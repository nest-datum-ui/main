import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormClear = (id) => async (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formClear',
		payload: {
			id,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormClear = (state, action) => {
	return ({
		...state,
		form: state.form[action.payload.id]
			? {
				...state.form,
				[action.payload.id]: {
					loader: false,
					options: [],
					settins: [],
					errors: {},
				},
			}
			: {
				0: {
					loader: false,
					options: [],
					settins: [],
					errors: {},
				},
			},
	});
};
