
const bool = (columnName) => (newValue, data) => {
	if (!newValue) {
		delete data[columnName];
	}
	else {
		data[columnName] = Boolean(Number(newValue));
	}
	return data;
};

export default bool;
