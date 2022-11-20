import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import { fireProp } from './prop.js';
import { fireRefresh } from './refresh.js';

let timeout;
/**
 * @return {Function}
 */
export const fireLogin = ({
	url,
	path,
}) => async (navigate = () => {}, snackbar = () => {}, prefix = 'auth') => {
	let apiPath = '';

	try {
		fireProp('loader', true)();

		const data = { ...Store().getState()[prefix] };

		apiPath = `${url}/${path}`;

		if (!data.login
			|| typeof data.login !== 'string') {
			data.errors['login'] = 'Login not specified.';
		}
		if (!data.password) {
			data.errors['password'] = 'Password not specified.';
		}

		if (Object.keys(data.errors || {}).length === 0) {
			const request = await axios.post(apiPath, {
				login: data.login,
				password: data.password,
			});

			localStorage.setItem(`${process.env.SITE_URL}_accessToken`, request.data.accessToken);
			localStorage.setItem(`${process.env.SITE_URL}_refreshToken`, request.data.refreshToken);

			Store().dispatch({
				type: prefix +'.login',
				payload: {
					authFlag: true,
					accessToken: request.data.accessToken,
					refreshToken: request.data.refreshToken,
					...request.data.userData,
					password: '',
				},
			});
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				fireRefresh({
					url,
					path: 'user/refresh',
				})(navigate, snackbar);
			}, 70000);

			navigate(`/`);
		}
		else {
			Store().dispatch({
				type: prefix +'.login',
				payload: data,
			});
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
		
		fireProp('loader', false)();

		return snackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerLogin = (state, action) => {
	return ({
		...state,
		...(action.payload || {}),
		loader: false,
	});
};
