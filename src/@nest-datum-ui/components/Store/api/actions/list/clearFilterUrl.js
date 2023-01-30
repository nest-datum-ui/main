import utilsUrlItem from '@nest-datum-ui/utils/url/item';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckObjFilled from '@nest-datum-ui/utils/check/obj/filled.js';
import { hookNavigate } from '@nest-datum-ui/utils/hooks';

export const fireListClearFilterUrl = (columnName) => {
	const navigate = hookNavigate();
	let query = utilsUrlItem('query', window.location.search) || '',
		sort = utilsUrlItem('sort', window.location.search, true),
		url = '';

	if (utilsCheckStr(columnName)) {
		let filter = utilsUrlItem('filter', window.location.search, true) || {};
	
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
		navigate(url);
	}
};
