import utilsCheckStr from '@nest-datum-ui/utils/check/str';

const exists = (value = '') => {
	return utilsCheckStr(value) && value;
};

export default exists;
