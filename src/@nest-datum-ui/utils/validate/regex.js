
const regex = (value, allowNull) => {
	try {
		if (allowNull) {
			return true;
		}
		else if (typeof value === 'string' && value) {
			value.test('');

			return true;
		}
		return false;
	}
	catch (err) {
		return false;
	}
};

export default regex;
