import { createSelector } from 'reselect';

const progressPercentage = (id) => createSelector(
	(state) => state['loader'],
	(state) => (state[id ?? 'window'] ?? {}).progressPercentage,
);

export default progressPercentage;
