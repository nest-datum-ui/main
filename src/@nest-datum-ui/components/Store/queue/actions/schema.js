import Store from '@nest-datum-ui/components/Store';

export const fireSchema = () => async (prefix = 'queue') => {
	Store().dispatch({
		type: prefix +'.schema',
	});
};

export const reducerSchema = (state, action) => {
	return ({
		0: {
			loop: [],
			now: undefined,
			ready: false,
		},
	});
};
