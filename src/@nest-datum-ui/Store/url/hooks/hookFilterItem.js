import hookProperty from './hookProperty.js';

const hookFilterItem = (columnName, search, storeFormName) => {
	const data = hookProperty('filter', search, true) || {};

	return data[columnName];
};

export default hookFilterItem;
