import Store from '@nest-datum-ui/components/Store';

export const fireFormClear = (storeFormName) => async (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formClear',
		payload: {
			storeFormName,
		},
	});
};

export const reducerFormClear = (state, action) => ({
	...state,
	form: state.form[action.payload.storeFormName]
		? {
			...state.form,
			[action.payload.storeFormName]: {
				loader: false,
				errors: {},
			},
		}
		: (action.payload.storeFormName === undefined)
			? ({
				0: {
					loader: false,
					errors: {},
				},
			})
			: state.form,
});
