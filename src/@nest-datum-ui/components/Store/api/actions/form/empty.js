import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormEmpty = (id, structure = {}) => (callback = () => {}, prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formEmpty',
		payload: {
			id,
			structure,
			callback,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormEmpty = (state, action) => {
	setTimeout(() => action.payload.callback(state), 0);

	return ({ 
		...state,
		form: {
			...state.form,
			[action.payload.id]: {
				...action.payload.structure,
			},
		}, 
	});
};
