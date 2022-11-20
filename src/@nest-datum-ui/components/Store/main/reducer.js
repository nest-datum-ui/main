import * as actionsLocal from './actions';

const reducer = (prefix = 'main', mergeActions = {}) => {
	return {
		...(() => {
			const collector = {};
			const actions = {
				...actionsLocal,
				...mergeActions,
			};

			Object
				.keys(actions)
				.forEach((key) => collector[prefix +'.'+ key] = actions[key]);
			return collector;
		})(),
	};
};

export default reducer;

