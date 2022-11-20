import { createSelector } from '@nest-datum-ui/reselect';

/**
 * @param {number|string} id - Loader ID
 * @return {Function}
 */
const visible = (id) => createSelector(
	(state) => state['loader'],
	(state) => !!(state[id ?? 'window'] ?? {}).visible,
);

export default visible;
