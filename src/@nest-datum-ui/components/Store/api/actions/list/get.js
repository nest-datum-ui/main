import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsCheckNumericInt from '@nest-datum-ui/utils/check/numeric/int.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { hookSnackbar } from '@nest-datum-ui/utils/hooks';
import { fireListProp as actionApiListProp } from './prop.js';

export const fireListGet = (url, {
	storeListName,
	page, 
	limit, 
	query, 
	relations,
	select,
	filter, 
	sort, 
}) => async (prefix = 'api') => {
	const snackbar = hookSnackbar();
	const storeName = storeListName || url;

	if (utilsCheckStrUrl(url)) {
		try {
			await actionApiListProp(storeName, 'loader', true)();

			const listData = ((Store()
				.getState()[prefix] || {})
				.list || {})[storeName] || {};
			const payload = {
				...utilsCheckNumericInt(page)
					? { page }
					: { page: (listData.page && 1) },
				...utilsCheckNumericInt(limit)
					? { limit }
					: { limit: (listData.limit && 20) },
				...utilsCheckStr(query)
					? { query }
					: {},
				...utilsCheckObj(relations)
					? { relations }
					: (utilsCheckStr(relations)
						? { relations: JSON.parse(decodeURI(relations)) }
						: {}), 
				...utilsCheckObj(select)
					? { select }
					: (utilsCheckStr(select)
						? { select: JSON.parse(decodeURI(select)) }
						: {}), 
				...utilsCheckObj(filter)
					? { filter }
					: (utilsCheckStr(filter)
						? { filter: JSON.parse(decodeURI(filter)) }
						: {}), 
				...utilsCheckObj(sort)
					? { sort }
					: (utilsCheckStr(sort)
						? { sort: JSON.parse(decodeURI(sort)) }
						: {}), 
			};
			const request = await axios(utilsUrlWithToken(url, payload));

			Store().dispatch({
				type: prefix +'.listGet',
				payload: {
					...payload,
					storeListName: storeName,
					url,
					total: request.data.total,
					data: request.data.rows,
				},
			});
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), url), { variant: 'error' });
			Store().dispatch({
				type: prefix +'.listGet',
				payload: {
					storeListName: storeName,
					url,
					total: 0,
					data: [],
				},
			});
		}
	}
};

export const reducerListGet = (state, action) => {
	if (utilsCheckObj(state.list[action.payload.storeListName])) {
		state.list[action.payload.storeListName] = {
			...state.list[action.payload.storeListName],
			loader: false,
			...(action.payload || {}),
		};
	}
	else if (utilsCheckStr(action.payload.storeListName)) {
		state.list[action.payload.storeListName] = {
			page: 1,
			limit: 20,
			total: 0,
			query: '',
			filter: {},
			sort: {},
			relations: {},
			data: null,
			errors: {},
			selected: [],
			...(action.payload || {}),
			loader: false,
		};
	}
	else {
		state.list[0] = {
			loader: false,
			page: 1,
			limit: 20,
			total: 0,
			query: '',
			filter: {},
			sort: {},
			relations: {},
			data: null,
			errors: {},
			selected: [],
		};
	}
	return {
		...state,
		list: {
			...state.list,
		},
	};
};
