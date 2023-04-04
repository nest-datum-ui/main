import { hookUrlProperty } from '@nest-datum-ui/Store';
import { bool as utilsCheckBool } from '@nest-datum-utils/check';

const hookFilterBoolItem = (search, columnName) => {
	const data = hookUrlProperty('filter', search, true) || {};

	return utilsCheckBool(data[columnName])
		? Number(data[columnName])
		: ''
};

export default hookFilterBoolItem;
