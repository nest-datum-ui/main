import { createSelector } from '@nest-datum-ui/reselect';

/**
 * @return {Function}
 */
const exists = () => createSelector(
	(state) => state['loader'],
	(state) => (state ?? {})._updater >= 0,
);

export default exists;
