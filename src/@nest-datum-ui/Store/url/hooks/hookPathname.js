import { hookLocation } from './index.js';

const hookPathname = () => {
	const { pathname } = hookLocation();

	return pathname;
};

export default hookPathname;
