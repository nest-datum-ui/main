import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormProp = (id, propName, propValue, path) => (prefix = 'api') => {
	Store().dispatch({
		type: prefix +'.formProp',
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
export const reducerFormProp = (state, action) => {
	if (!state.form[action.payload.id]
		|| typeof state.form[action.payload.id] !== 'object'
		|| Array.isArray(state.form[action.payload.id])) {
		state.form[action.payload.id] = {};
	}
	if (((typeof action.payload.id === 'number'
			&& !Number.isNaN(action.payload.id))
		|| (action.payload.id
			&& typeof action.payload.id === 'string'))) {
		if (Array.isArray(action.payload.path)) {
			let target = state.form[action.payload.id][action.payload.propName],
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
				state.form[action.payload.id][action.payload.propName] = Array.isArray(state.form[action.payload.id][action.payload.propName])
					? ([ ...state.form[action.payload.id][action.payload.propName] ])
					: ({ ...state.form[action.payload.id][action.payload.propName] });
			}
		}
		else {
			state.form[action.payload.id][action.payload.propName] = action.payload.propValue;
		}
		state.form[action.payload.id] = { ...state.form[action.payload.id] };
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
