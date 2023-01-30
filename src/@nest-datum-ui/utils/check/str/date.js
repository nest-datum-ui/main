import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';

const date = (value = '') => {
	if (!value) {
		return false;
	}
	let processedValue = value;

	if (utilsCheckStr(value) || utilsCheckNumeric(value)) {
		processedValue = new Date(value);
	}
	return (processedValue instanceof Date && !Number.isNaN(processedValue));
};

export default date;
