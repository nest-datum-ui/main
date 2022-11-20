import extract from './extract.js';

const isArray = (path = []) => extract(path, (state) => Array.isArray(state));

export default isArray;
