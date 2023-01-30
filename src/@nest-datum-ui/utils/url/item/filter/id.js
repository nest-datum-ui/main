import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

const id = (columnName) => (newValue = '', data) => {
	if (utilsCheckArr(newValue) && newValue.length > 0) {
		data[columnName] = [ '$In', ...newValue.map((item) => item.value) ];
	}
	else {
		delete data[columnName];
	}
	return data;
};

export default id;
