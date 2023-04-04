import { createSelector } from 'reselect';

const text = (id) => createSelector(
	(state) => state['loader'],
	(state) => (state[id ?? 'window'] ?? {}).text,
);

export default text;
