import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import utilsCheckObjFilled from '@nest-datum-ui/utils/check/obj/filled.js';
import { hookNavigate } from '@nest-datum-ui/utils/hooks';
// import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireListCreateFilterUrl = async (e, callback = (data) => data) => {
	const navigate = hookNavigate();
	let url = ``,
		filter = utilsUrlSearchPathItem('filter', window.location.search, true) || {},
		query = utilsUrlSearchPathItem('query', window.location.search),
		sort = utilsUrlSearchPathItem('sort', window.location.search, true);

	filter = callback(e.target.value, filter);

	if (utilsCheckObjFilled(filter)) {
		url += `?filter=${JSON.stringify(filter)}`;
	}
	if (utilsCheckObjFilled(sort)) {
		url += url
			? `&sort=${JSON.stringify(sort)}`
			: `?sort=${JSON.stringify(sort)}`;
	}
	if (query) {
		url += url
			? `&query=${query}`
			: `?query=${query}`;
	}
	navigate(window.location.pathname + url);
};
