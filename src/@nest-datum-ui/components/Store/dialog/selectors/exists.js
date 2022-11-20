import { createSelector } from 'reselect';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['dialog'],
	(state) => (state ?? {})._updater >= 0,
);

export default exists;
