import { fireListProp as actionApiListProp } from '../list/prop.js';
import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormRestore = ({
	entityId, 
	storeName,
	url,
	path,
	withAccessToken = false,
}) => async (snackbar = () => {}, callback = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiListProp(storeName, 'loader', true)();

		apiPath = `${url}/${path}/${entityId}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
				: {},
		}).toString()}`;

		await axios.patch(apiPath, {
			isDeleted: false,
		});

		const formData = Store()
			.getState()['api']
			.form[entityId];
		const listData = (Store()
			.getState()['api']
			.list[storeName] || {})
			.data || [];
		const entityIndex = listData.findIndex((item) => item.id === entityId);

		if (formData
			&& typeof formData === 'object') {
			actionApiFormProp(entityId, 'isDeleted', false)();
		}
		if (entityIndex >= 0) {
			actionApiListProp(storeName, 'data', false, [ entityIndex, 'isDeleted' ])();
		}
		await actionApiListProp(storeName, 'loader', false)();

		callback(formData, listData, entityIndex);
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
