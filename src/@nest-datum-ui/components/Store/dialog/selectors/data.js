import { createSelector } from 'reselect';

/**
 * @param {number|string} id - Dialog ID
 * @return {Function}
 */
const data = (id) => createSelector(
	(state) => state['dialog'],
	(state) => (state ?? {})[id],
);

export default data;
