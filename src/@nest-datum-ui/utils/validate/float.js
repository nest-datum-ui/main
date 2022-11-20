
const validFirstSign = ['', '-', '.'];
const regExpNumeric = "^[+-]?\\d*\\.\\d+$|^[+-]?\\d+(\\.\\d*)?$";
const float = (e, testFlag) => {
	if (testFlag) {
		return /^[+-]?\d+(\.\d+)?$/.test(e);
	}
	const target = e.target;

	if (typeof target !== 'undefined') {
		const value = target.value;

		if (!value.match(regExpNumeric) && !validFirstSign.indexOf(value) >= 0) {
			target.value = value.substring(0, value.length - 1);
		}
		if (target.value[0] === '0' && target.value[1] !== '.')	{
			target.value = '0';
		}
	}
};

export default float;
