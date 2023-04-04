import * as actions from './actions';

const reducer = (prefix = 'main', mergeActions = {}) => {
	return {
		...(() => {
			const collector = {};
			const actionsProcessed = {
				...actions,
				...mergeActions,
			};

			Object
				.keys(actionsProcessed)
				.forEach((key) => collector[prefix +'.'+ key] = actionsProcessed[key]);
			return collector;
		})(),
	};
};

export default reducer;

