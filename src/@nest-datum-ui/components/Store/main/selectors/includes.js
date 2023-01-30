import extract from './extract.js';

const includes = (path = [], ...values) => extract(path, (state) => (state || []).includes(...values));

export default includes;
