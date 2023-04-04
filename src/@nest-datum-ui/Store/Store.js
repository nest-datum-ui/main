import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import {
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import structure from './structure.js';
import { reducerSchema } from './main/actions/schema.js';

let _store;

const _reducerWrapper = (name, reducerFunc = () => {}) => {
	return (state = reducerSchema(), action) => {
		const actions = reducerFunc();

		return typeof actions[action.type] === 'function'
			? actions[action.type](state, action)
			: state;
	};
};

const _create = (reducersObject = {}, middleware) => {
	const appliedMiddleware = applyMiddleware(thunk, typeof middleware === 'function' ?
		middleware :
		(store) => (next) => (action) => next(action));
	return (_store = createStore(_combineReducers(reducersObject), undefined, appliedMiddleware));
};

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
const storeDispatch = async (prefix, type, payload) => {
	if (!utilsCheckStrId(prefix)) {
		throw new Error(`Can't dispatch event to reducer. Store prefix "${prefix}" is not valid.`);
	}
	if (!utilsCheckStrName(type)) {
		throw new Error(`Can't dispatch event to reducer. Store type "${type}" is not valid.`);
	}

	return await (new Promise((resolve, reject) => {
		setTimeout(() => {
			getStore().dispatch({
				prefix,
				type,
				...payload,
			});
			setTimeout(() => resolve({ ...getStore().getState()[prefix] }), 0);
		});
	}));
};

export {
	setStore,
	getStore,
	storeDispatch,
};
