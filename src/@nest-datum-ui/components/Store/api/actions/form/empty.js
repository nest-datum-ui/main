import Store from '@nest-datum-ui/components/Store';

export const fireFormEmpty = (storeFormName, structure) => (callback = () => {}, prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formEmpty',
		payload: {
			storeFormName,
			structure,
		},
	});
	callback(Store().getState()[prefix] || {});
};

export const reducerFormEmpty = (state, action) => ({ 
	...state,
	form: {
		...state.form,
		[action.payload.storeFormName]: {
			...(action.payload.structure || {}),
		},
	}, 
});
