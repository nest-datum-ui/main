import extract from './extract.js';

const findArray = (path = [], callback = () => {}) => extract(path, (state) => Array.isArray(state)
	? state.find(callback)
	: undefined);

export default findArray;
