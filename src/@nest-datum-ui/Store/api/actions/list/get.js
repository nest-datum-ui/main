import axios from 'axios';
import {
	str as utilsCheckStr,
	strUrl as utilsCheckStrUrl,
	numericInt as utilsCheckNumericInt,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import { 
	urlApiStr as utilsFormatUrlApiStr,
	httpErrorMessage as utilsFormatHttpErrorMessage, 
} from '@nest-datum-utils/format';
import { 
	storeDispatch,
	getStore, 
} from '../../../Store.js';
import { fireHide } from '../../../loader/actions/hide.js';
import { fireListProp } from './prop.js';

export const fireListGet = (storeName, {
	disableLoader = false,
	apiUrl,
	merge = false,
	page = 1, 
	limit = 20, 
	query, 
	relations,
	select,
	filter, 
	sort, 
	data,
}) => async (callback = () => {}, prefix = 'api') => {
	try {
		if (!utilsCheckStrUrl(apiUrl)) {
			return await storeDispatch(prefix, prefix +'.listGet', {
				payload: {
					page,
					limit,
					query,
					relations,
					select,
					filter,
					sort,
					storeName,
					callback,
					merge,
					data,
				},
			});
		}
		if (!disableLoader) {
			await fireListProp(storeName, 'loader', true)();
		}

		const listData = ((getStore()
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
		const request = await axios(utilsFormatUrlApiStr(apiUrl, payload));

		return await storeDispatch(prefix, prefix +'.listGet', {
			payload: {
				...payload,
				storeName,
				url: apiUrl,
				total: request.data.total,
				data: request.data.rows,
				callback,
				merge,
			},
		});
	}
	catch (err) {
		await storeDispatch(prefix, prefix +'.listGet', {
			payload: {
				storeName,
				url: apiUrl,
				total: 0,
				data: [],
				callback,
				merge,
			},
		});

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};

export const reducerListGet = (state, action) => {
	if (utilsCheckObj(state.list[action.payload.storeName])) {
		state.list[action.payload.storeName] = {
			...state.list[action.payload.storeName],
			...(action.payload || {}),
			data: [
				...state.list[action.payload.merge]
					? ([ ...(state.list[action.payload.storeName]['data'] || []) ])
					: ([ ...((action.payload || {})['data'] || []) ]),
			],
			loader: false,
		};
	}
	else if (utilsCheckStr(action.payload.storeName)) {
		state.list[action.payload.storeName] = {
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
			loader: false,
			...(action.payload || {}),
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
	setTimeout(() => {
		action.payload.callback(state.list[action.payload.storeName || 0]);

		fireHide('unmount')();
	}, 0);
	
	return {
		...state,
		list: {
			...state.list,
		},
	};
};
