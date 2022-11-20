import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormUpdate = ({
	entityId, 
	url,
	path,
	withAccessToken = false,
}) => async (snackbar = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const data = { ...Store().getState()[prefix].form[entityId] };
		const options = (Store().getState()[prefix].list[`options${entityId}`] || {}).data;

		delete data['loader'];
		delete data['options'];
		delete data['settins'];
		delete data['errors'];

		apiPath = `${url}/${path}/${entityId}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`) }
				: {},
		}).toString()}`;

		await axios.patch(apiPath, data);

		if (Array.isArray(options)
			&& options.length > 0) {
			apiPath = `${url}/${path}/${entityId}/options?${new URLSearchParams({
				...withAccessToken
					? { accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`) }
					: {},
			}).toString()}`;

			await axios.post(apiPath, options.map((option) => option.values));
		}

		snackbar('Entity successfully updated.', { variant: 'success' });
		actionApiFormProp(entityId, 'loader', false)();
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
		actionApiFormProp(entityId, 'loader', false)();
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormUpdate = (state, action) => {
	if (state.form[action.payload.id]
		&& typeof state.form[action.payload.id] === 'object'
		&& !Array.isArray(state.form[action.payload.id])) {
		state.form[action.payload.id] = {
			...state.form[action.payload.id],
			...(action.payload || {}),
			loader: false,
			errors: {},
		};
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
