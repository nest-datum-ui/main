import findFilterItem from '../selectors/findFilterItem.js';
import { 
	str as utilsCheckStr,
	objFilled as utilsCheckObjFilled, 
} from '@nest-datum-utils/check';
import { hookNavigate } from '../hooks';

export const fireFilterClear = (columnName) => {
	let query = findFilterItem('query', window.location.search) || '',
		sort = findFilterItem('sort', window.location.search, true),
		url = '';

	if (utilsCheckStr(columnName)) {
		let filter = findFilterItem('filter', window.location.search, true) || {};
	
		delete filter[columnName];

		if (utilsCheckObjFilled(filter)) {
			url += `?filter=${JSON.stringify(filter)}`;
		}
		if (utilsCheckStr(query) && query.length > 0) {
			url += `${url ? '&' : '?'}query=${query}`;
		}
		if (utilsCheckObjFilled(sort)) {
			url += `${url ? '&' : '?'}sort=${JSON.stringify(sort)}`;
		}
	}
	else {
		const searchInputNode = document.getElementById('form-search');

		if (searchInputNode) {
			searchInputNode.value = '';
		}
	}
	url = window.location.pathname + url;
	
	if (url !== window.location.href) {
		hookNavigate(url);
	}
};
