import utilsCheckStr from './index.js';

const url = (value = '') => utilsCheckStr(value) && ((value || '').indexOf('http://') === 0 || (value || '').indexOf('https://') === 0);

export default url;
