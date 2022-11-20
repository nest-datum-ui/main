import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';

const onChange = (columnName, sortValue) => {
	let url = '',
		query = utilsUrlSearchPathItem('filter', window.location.search),
		filter = utilsUrlSearchPathItem('filter', window.location.search, true),
		sort = utilsUrlSearchPathItem('sort', window.location.search, true);

	if (typeof sort !== 'object') {
		sort = {};
	}
	if (sortValue) {
		sort[columnName] = sortValue;
	}
	else {
		delete sort[columnName];
	}
	if (Object.keys(sort).length > 0) {
		url = `?sort=${JSON.stringify(sort)}`;
	}
	if (typeof query === 'string'
		&& query) {
		url += url
			? `&query=${query}`
			: `?query=${query}`;
	}
	if (typeof filter === 'object'
		&& Object.keys(filter).length > 0) {
		url += url
			? `&filter=${JSON.stringify(filter)}`
			: `?filter=${JSON.stringify(filter)}`;
	}
	return url;
};

export default onChange;
