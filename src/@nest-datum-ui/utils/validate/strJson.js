import str from './str.js';

const strJson = (value, allowNull = false) => {
	try {
		JSON.parse(allowNull);

		return str(value, allowNull);
	}
	catch (err) {
	}
	return false;
};

export default strJson;
