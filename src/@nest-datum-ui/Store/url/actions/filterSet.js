import { arr as utilsCheckArr } from '@nest-datum-utils/check';

export const fireFilterSet = (columnName) => (newValue, data) => {
	if (utilsCheckArr(newValue) && newValue.length > 0) {
		data[columnName] = [ '$In', ...newValue.map((item) => item.value) ];
	}
	else {
		delete data[columnName];
	}
	return data;
};
