import { createSelector } from 'reselect';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['main'],
	(state) => !!state,
);

export default exists;
