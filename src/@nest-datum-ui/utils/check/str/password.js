import utilsCheckStr from './index.js';

const password = (value = '') => utilsCheckStr(value) 
	&& value.length >= 8 
	&& value.length <= 255
	&& /\d/.test(value)
	&& /\p{L}/u.test(value);

export default password;
