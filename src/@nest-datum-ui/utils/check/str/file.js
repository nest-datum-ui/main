import utilsCheckStr from './index.js';

const file = (value = '') => utilsCheckStr(value) 
	&& value.indexOf('data:') === 0 
	&& value.includes(';base64');

export default file;
