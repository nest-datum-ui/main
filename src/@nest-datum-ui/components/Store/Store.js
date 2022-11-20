import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import structure from './structure.js';
import { reducerSchema } from './main/actions/schema.js';

let _store;

/**
 * @param {string} name - Reducer name
 * @param {function} reducerFunc - Reducer func
 * @return {object}
 */
const _reducerWrapper = (name, reducerFunc = () => {}) => {
	return (state = reducerSchema(), action) => {
		const actions = reducerFunc();

		return typeof actions[action.type] === 'function'
			? actions[action.type](state, action)
			: state;
	};
};

/**
 * @param {object} reducersObject - Reducers list
 * @param {function} middleware
 * @return {object}
 */
const _create = (reducersObject = {}, middleware) => {
	const appliedMiddleware = applyMiddleware(thunk, typeof middleware === 'function' ?
		middleware :
		(store) => (next) => (action) => next(action));
	return (_store = createStore(_combineReducers(reducersObject), undefined, appliedMiddleware));
};

/**
 * @param {object} reducersObject - Reducers list
 * @return {object}
 */
const _combineReducers = (reducersObject = {}) => {
	let i = 0,
		reducers = {};
	const keys = Object.keys(reducersObject);
	
	while (i < keys.length) {
		reducers[keys[i]] = _reducerWrapper(keys[i], reducersObject[keys[i]]);
		i++;
	}
	return combineReducers(reducers);
};
const setStore = (store) => (_store = store ?? _create(structure));
const getStore = () => _store;

export {
	setStore,
	getStore,
};
