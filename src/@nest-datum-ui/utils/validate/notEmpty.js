
const notEmpty = (value) => typeof value !== 'undefined'
	&& value !== null
	&& !Number.isNaN(value);

export default notEmpty;
