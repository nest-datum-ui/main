import { createSelector } from 'reselect';

/**
 * @param {number|string} id - Menu ID
 * @return {Function}
 */
const node = (id) => createSelector(
	(state) => state['menu'],
	(state) => (state[id] || {})['node'],
);

export default node;
