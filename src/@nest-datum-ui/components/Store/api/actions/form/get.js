import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormGet = ({
	entityId, 
	url,
	path,
	withAccessToken = false,
}) => async (snackbar = () => {}, navigate = () => {}, prefix = 'api') => {
	if (url
		&& path) {
		let apiPath = '';

		try {
			await actionApiFormProp(entityId, 'loader', true)();

			apiPath = `${url}/${path}/${entityId}?${new URLSearchParams({
				...withAccessToken
					? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
					: {},
			}).toString()}`;

			const request = await axios(apiPath);

			Store().dispatch({
				type: prefix +'.formGet',
				payload: {
					id: entityId,
					data: request.data,
				},
			});
		}
		catch (err) {
			if (err.response
				&& err.response.status === 404) {
				const pathnameSplit = window.location.pathname.split('/');

				pathnameSplit.splice(pathnameSplit.length - 1, 1);

				navigate(pathnameSplit.join('/'));
			}
			else {
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
		}
	}
	else {
		Store().dispatch({
			type: prefix +'.formGet',
			payload: {
				id: entityId,
				data: {},
			},
		});
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormGet = (state, action) => {
	if (action.payload.id
		&& typeof action.payload.id === 'string') {
		state.form[action.payload.id] = {
			options: [],
			settins: [],
			...(state.form[action.payload.id] || state.form['0'] || {}),
			...(action.payload.data || {}),
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
