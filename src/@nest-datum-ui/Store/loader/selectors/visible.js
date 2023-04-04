import { createSelector } from 'reselect';

const visible = (id) => createSelector(
	(state) => state['loader'],
	(state) => !!(state[id ?? 'window'] ?? {}).visible,
);

export default visible;
