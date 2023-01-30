import utilsCheckBool from '@nest-datum-ui/utils/check/bool';
import utilsUrlItem from '../../index.js';

const bool = (search, columnName) => {
	const data = utilsUrlItem('filter', search, true) || {};

	return utilsCheckBool(data[columnName])
		? Number(data[columnName])
		: ''
};

export default bool;
