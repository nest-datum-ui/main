import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireNext = (queueName) => async (prefix = 'queue') => {
	Store().dispatch({
		type: prefix +'.next',
		payload: {
			queueName,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerNext = (state, action) => {
	if (!state[action.payload.queueName]) {
		state[action.payload.queueName] = {
			loop: [],
			now: undefined,
			ready: false,
		};
	}

	if (state[action.payload.queueName].now) {
		state[action.payload.queueName].now = state[action.payload.queueName].loop[0];

		state[action.payload.queueName].loop.splice(0, 1);
	}
	if (!state[action.payload.queueName].now
		|| state[action.payload.queueName].loop.length === 0) {
		state[action.payload.queueName].ready = true;
	}
	return ({
		...state,
	});
};
