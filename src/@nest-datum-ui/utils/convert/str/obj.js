
const obj = (value = '') => {
	if (typeof value === 'object') {
		return value;
	}
	try {
		return JSON.parse(value);
	}
	catch (err) {
		return {};
	}
};

export default obj;
