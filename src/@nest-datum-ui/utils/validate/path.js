
const path = (value, allowNull = false) => {
	if (typeof value !== 'undefined') {
		if (typeof value !== 'string') {
			return false;
		}
		const valueStr = value[0] === '/'
			? value.substr(1)
			: value;

		const valueSplit = valueStr.split('/');
		let i = 0;

		if (valueSplit.length === 1
			&& valueSplit[0] === '') {
			return true;
		}

		while (i < valueSplit.length) {
			if (!valueSplit[i]
				|| !(/[^/.]/ig.test(valueSplit[i]))) {
				return false;
			}
			i++;
		}
		return true;
	}
	else if (!allowNull) {
		return false;
	}
};

export default path;
