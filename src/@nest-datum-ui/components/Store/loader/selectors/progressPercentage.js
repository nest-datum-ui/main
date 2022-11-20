import { createSelector } from '@nest-datum-ui/reselect';

/**
 * @param {number|string} id - Loader ID
 * @return {Function}
 */
const progressPercentage = (id) => createSelector(
	(state) => state['loader'],
	(state) => (state[id ?? 'window'] ?? {}).progressPercentage,
);

export default progressPercentage;
