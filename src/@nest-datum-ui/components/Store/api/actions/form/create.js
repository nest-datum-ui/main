import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormCreate = ({
	entityId, 
	url,
	path,
	withAccessToken = false,
}) => async (snackbar = () => {}, navigate = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const data = { ...Store().getState()[prefix].form[entityId] };

		delete data['loader'];
		delete data['options'];
		delete data['settins'];
		delete data['errors'];

		apiPath = `${url}/${path}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`) }
				: {},
		}).toString()}`;
		const request = await axios.post(apiPath, data);
		const newId = request.data.id;
		const pathnameSplit = window.location.pathname.split('/');

		Store().dispatch({
			type: prefix +'.formCreate',
			payload: request.data,
		});
		pathnameSplit.splice(pathnameSplit.length - 1, 1);

		const newPath = `${pathnameSplit.join('/')}/${newId}`;

		navigate(newPath);
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
export const reducerFormCreate = (state, action) => {
	if (!state.form[action.payload.id]
		|| typeof state.form[action.payload.id] !== 'object'
		|| Array.isArray(state.form[action.payload.id])) {
		state.form[action.payload.id] = {
			loader: false,
			options: [],
			settins: [],
			errors: {},
		};
	}
	if (((typeof action.payload.id === 'number'
			&& !Number.isNaN(action.payload.id))
		|| (action.payload.id
			&& typeof action.payload.id === 'string'))) {
		state.form[action.payload.id] = {
			...state.form[action.payload.id],
			...(action.payload || {}),
		};
	}
	return ({ ...state });
};
