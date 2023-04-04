import str from './index.js';

const email = (value) => str(value)
	&& (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test((value || '').toLowerCase()));

export default email;

