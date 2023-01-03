import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireDrop = (queueName, id) => async (prefix = 'queue') => {
	Store().dispatch({
		type: prefix +'.drop',
		payload: {
			queueName,
			id,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerDrop = (state, action) => {
	if (!state[action.payload.queueName]) {
		state[action.payload.queueName] = {
			loop: [],
			now: undefined,
			ready: false,
		};
	}
	const index = state[action.payload.queueName].loop.indexOf(action.payload.id);

	if (index >= 0) {
		state[action.payload.queueName].loop.splice(index, 1);
	}
	if (state[action.payload.queueName].length === 0) {
		state[action.payload.queueName] = {
			loop: [],
			now: undefined,
			ready: false,
		};
	}
	return ({
		...state,
	});
};
