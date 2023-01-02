import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireAdd = (queueName, id, value) => async (prefix = 'queue') => {
	Store().dispatch({
		type: prefix +'.add',
		payload: {
			queueName,
			id,
			value,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerAdd = (state, action) => {
	if (!state[action.payload.queueName]) {
		state[action.payload.queueName] = {
			loop: [],
			now: undefined,
			ready: false,
		};
	}
	state[action.payload.queueName].loop.push(action.payload.id);

	if (!state[action.payload.queueName].now) {
		state[action.payload.queueName].now = action.payload.id;
	}
	return ({
		...state,
	});
};
