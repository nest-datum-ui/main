import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireListProp = (id, propName, propValue, path) => (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.listProp',
		payload: {
			id,
			propName, 
			propValue,
			path,
		},
	});
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListProp = (state, action) => {
	if (!state.list[action.payload.id]
		|| typeof state.list[action.payload.id] !== 'object'
		|| Array.isArray(state.list[action.payload.id])) {
		state.list[action.payload.id] = {};
	}
	if (((typeof action.payload.id === 'number'
			&& !Number.isNaN(action.payload.id))
		|| (action.payload.id
			&& typeof action.payload.id === 'string'))) {
		
		if (Array.isArray(action.payload.path)) {
			let target = state.list[action.payload.id][action.payload.propName],
				i = 0;

			if (target
				&& typeof target === 'object') {
				if (action.payload.path.length >= 2) {
					while (i < action.payload.path.length - 2) {
						target = target[action.payload.path[i]];
						i++;
					}
					target[action.payload.path[action.payload.path.length - 2]][action.payload.path[action.payload.path.length - 1]] = action.payload.propValue;
				}
				else if (action.payload.path.length === 1) {
					target[action.payload.path[action.payload.path.length - 1]] = action.payload.propValue;
				}
				state.list[action.payload.id][action.payload.propName] = Array.isArray(state.list[action.payload.id][action.payload.propName])
					? ([ ...state.list[action.payload.id][action.payload.propName] ])
					: ({ ...state.list[action.payload.id][action.payload.propName] });
			}
		}
		else {
			state.list[action.payload.id][action.payload.propName] = action.payload.propValue;
		}
		state.list[action.payload.id] = { ...state.list[action.payload.id] };
	}
	return ({ 
		...state,
		list: {
			...state.list,
		}, 
	});
};
