import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import { hookNavigate } from '@nest-datum-ui/utils/hooks';

export const fireListSearchUrl = async (newQuery) => {
	const currentQuery = utilsUrlSearchPathItem('query', window.location.search) || '';

	if (newQuery !== currentQuery) {
		const navigate = hookNavigate();

		let url = '',
			sort = utilsUrlSearchPathItem('sort', window.location.search, true);

		if (newQuery.length > 0) {
			url = `?query=${newQuery}`;
		}
		if (sort
			&& typeof sort === 'object'
			&& Object.keys(sort).length > 0) {
			url += url
				? `&sort=${JSON.stringify(sort)}`
				: `?sort=${JSON.stringify(sort)}`;
		}
		url = window.location.pathname + url;

		navigate(url);
	}
};
