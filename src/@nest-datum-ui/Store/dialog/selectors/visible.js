import { createSelector } from 'reselect';

const visible = (id) => createSelector(
	(state) => state['dialog'],
	(state) => !!state[id],
);

export default visible;
