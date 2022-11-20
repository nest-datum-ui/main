
const phone = (value = '') => {
	const valueParsed = value.replace(/[-()+\s]/g, '');

	return (valueParsed.length >= 10
		&& Number(valueParsed) > 1);
};

export default phone;
