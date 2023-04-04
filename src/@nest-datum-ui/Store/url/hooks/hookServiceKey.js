import { hookLocation } from './index.js';

const hookServiceKey = () => {
	const { pathname } = hookLocation();
	
	return pathname.split('/')[1] || '';
};

export default hookServiceKey;
