import { hooksFind } from '@nest-datum-ui/utils/hooks';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsUrlItem from '../../index.js';

const id = (search, storeFormName, columnName) => {
	const data = utilsUrlItem('filter', search, true) || {};

	return utilsCheckArr(data[columnName])
		? hooksFind(storeFormName, data[columnName])
		: [];
};

export default id;
