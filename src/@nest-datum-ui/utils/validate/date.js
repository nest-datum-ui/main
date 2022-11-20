
const date = (value, allowNull = false) => {
	let processedValue = value;

	if (value
		&& (typeof value === 'string'
			|| value >= 0)) {
		processedValue = new Date(value);
	}
	return (processedValue instanceof Date && !Number.isNaN(processedValue)) || allowNull;
};

export default date;

