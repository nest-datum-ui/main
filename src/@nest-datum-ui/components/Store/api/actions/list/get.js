import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import { fireListProp as actionApiListProp } from './prop.js';

/**
 * @return {Function}
 */
export const fireListGet = ({ 
	id, 
	url, 
	path,
	withAccessToken = false,
	page = 1, 
	limit = 20, 
	query, 
	select,
	filter, 
	sort, 
	relations,
} = {}) => async (snackbar = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiListProp(id, 'loader', true)();

		const realQuery = query;
		const realSelect = select ?? {};
		const realFilter = filter ?? {};
		const realSort = sort ?? {};
		const realRelations = relations ?? {};
		
		apiPath = `${url}/${path}?${new URLSearchParams({
			page,
			limit,
			...realQuery
				? { query: realQuery }
				: {},
			...Object.keys(realSelect).length > 0
				? { select: JSON.stringify(realSelect) }
				: {},
			...Object.keys(realFilter).length > 0
				? { filter: JSON.stringify(realFilter) }
				: {},
			...Object.keys(realSort).length > 0
				? { sort: JSON.stringify(realSort) }
				: {},
			...Object.keys(realRelations).length > 0
				? { relations: JSON.stringify(realRelations) }
				: {},
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
				: {},
		}).toString()}`;

		const request = await axios(apiPath);

		Store().dispatch({
			type: prefix +'.listGet',
			payload: {
				id,
				page,
				limit,
				total: request.data.total,
				data: request.data.rows,
				query: realQuery,
				select: realSelect,
				filter: realFilter,
				sort: realSort,
				relations: realRelations,
			},
		});
	}
	catch (err) {
		const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		snackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
		
		Store().dispatch({
			type: prefix +'.listGet',
			payload: {
				id,
				data: [],
			},
		});
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerListGet = (state, action) => {
	if (state.list[action.payload.id]
		&& !Array.isArray(state.list[action.payload.id])
		&& typeof state.list[action.payload.id] === 'object') {
		state.list[action.payload.id] = {
			...state.list[action.payload.id],
			...(action.payload || {}),
			loader: false,
		};
	}
	else if ((typeof action.payload.id === 'number' 
			&& !Number.isNaN(action.payload.id))
		|| (typeof action.payload.id === 'string'
			&& action.payload.id)){
		state.list[action.payload.id] = {
			page: 1,
			limit: 20,
			total: 0,
			query: '',
			filter: {},
			sort: {},
			relations: {},
			data: null,
			errors: {},
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
		};
	}
	return ({
		...state,
		list: {
			...state.list,
		},
	});
};
