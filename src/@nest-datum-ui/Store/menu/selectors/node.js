import { createSelector } from 'reselect';

const node = (id) => createSelector(
	(state) => state['menu'],
	(state) => (state[id] || {})['node'],
);

export default node;
