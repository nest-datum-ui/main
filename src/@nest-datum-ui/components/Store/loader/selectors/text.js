import { createSelector } from '@nest-datum-ui/reselect';

/**
 * @param {number|string} id - Loader ID
 * @return {Function}
 */
const text = (id) => createSelector(
	(state) => state['loader'],
	(state) => (state[id ?? 'window'] ?? {}).text,
);

export default text;
