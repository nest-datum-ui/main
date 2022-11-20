import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireListGet as actionApiListGet } from '../list/get.js';
import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';

/**
 * @return {Function}
 */
export const fireFormDrop = ({
	entityId, 
	storeName,
	url,
	path,
	withAccessToken = false,
	allowInsecureDeletion = false,
}) => async (snackbar = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiListProp(storeName, 'loader', true)();

		apiPath = `${url}/${path}/${entityId}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`) }
				: {},
		}).toString()}`;

		await axios.delete(apiPath);

		if (!allowInsecureDeletion) {
			const formData = Store()
				.getState()['api']
				.form[entityId];

			const list = Store()
				.getState()['api']
				.list[storeName] || {};
			const listData = list.data || [];
			const entityIndex = listData.findIndex((item) => (item.id === entityId));

			if (formData
				&& typeof formData === 'object') {
				if (formData.isDeleted) {
					Store().dispatch({
						type: prefix +'.formDrop',
						payload: {
							id: entityId,
						}
					});
					const pathnameSplit = window
						.location
						.pathname
						.replace(/\/+$/, '')
						.split('/');

					if (pathnameSplit[pathnameSplit.length - 1] === entityId) {
						window.location.href = window.location.pathname;
					}
				}
				else {
					await actionApiFormProp(entityId, 'isDeleted', true)();
					await actionApiListProp(storeName, 'loader', false)();
				}
			}
			if (entityIndex >= 0
				&& listData[entityIndex]) {
				if (listData[entityIndex].isDeleted) {
					const query = utilsUrlSearchPathItem('query', window.location.search);
					const select = utilsUrlSearchPathItem('select', window.location.search);
					const filter = utilsUrlSearchPathItem('filter', window.location.search);
					const sort = utilsUrlSearchPathItem('sort', window.location.search);

					actionApiListGet({
						id: storeName, 
						url,
						path,
						withAccessToken,
						page: list.page,
						limit: list.limit,
						query,
						...select
							? { select: JSON.parse(decodeURI(select)) }
							: {},
						...filter
							? { 
								filter: {
									...JSON.parse(decodeURI(filter)),
									id: [ '$Not', entityId ],
								},
							}
							: {
								filter: {
									'id': [ '$Not', entityId ],
								},
							},
						...sort
							? { sort: JSON.parse(decodeURI(sort)) }
							: {},
					})(snackbar);
				}
				else {
					await actionApiListProp(storeName, 'data', true, [ entityIndex, 'isDeleted' ])();
					await actionApiListProp(storeName, 'loader', false)();
				}
			}
		}
		else {
			await actionApiListProp(storeName, 'loader', false)();
		}
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
		actionApiListProp(storeName, 'loader', false)();
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormDrop = (state, action) => {
	if (state.form[action.payload.id]) {
		delete state.form[action.payload.id];
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
