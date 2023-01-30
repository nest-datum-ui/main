import utilsCheckObj from './index.js';

const filled = (value) => utilsCheckObj(value) && Object.keys(value).length > 0;

export default filled;
