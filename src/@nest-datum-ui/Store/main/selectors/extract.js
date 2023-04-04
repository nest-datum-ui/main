import { createSelector } from 'reselect';
import { getStore } from '../../Store.js';

/**
 * @param {array} path - List of keys for extracting value from internal parameters
 * @param {Function} parseFunc - Function for processing the result of the selection
 * @return {Function}
 */
const extract = (path = [], parseFunc) => createSelector(
	(state) => {
		const _path = [ ...path ];
		const _prefix = _path.shift();

		return state[_prefix];
	},
	(state) => {
		if (typeof state === 'undefined') {
			return typeof parseFunc === 'function'
				? parseFunc(undefined, getStore().getState())
				: undefined;
		}
		else if (state === null) {
			return typeof parseFunc === 'function'
				? parseFunc(null, getStore().getState())
				: null;
		}
		const _path = [ ...path ];

		_path.shift();

		if (_path.length <= 0) {
			return typeof parseFunc === 'function'
				? parseFunc(state, getStore().getState())
				: state;
		}
		let i = 0;

		while (i < _path.length) {
			if (typeof state[_path[i]] === 'undefined') {
				return typeof parseFunc === 'function'
					? parseFunc(undefined, getStore().getState())
					: undefined;
			}
			else if (state[_path[i]] === null) {
				return typeof parseFunc === 'function'
					? parseFunc(null, getStore().getState())
					: null;
			}
			state = state[_path[i]];
			i++;
		}
		return typeof parseFunc === 'function'
			? parseFunc(state, getStore().getState())
			: state;
	},
);

export default extract;
