import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import { fireProp } from './prop.js';

/**
 * @return {Function}
 */
export const fireReset = ({
	url,
	path,
}) => async (navigate = () => {}, snackbar = () => {}, prefix = 'auth') => {
	try {
		fireProp('loader', true)();

		const data = { ...Store().getState()[prefix] };

		const verifyKey = ((window.location.search.split('verifyKey='))[1].split('&'))[0];

		if (!verifyKey
			|| typeof verifyKey !== 'string') {
			data.errors['verifyKey'] = 'Activation key not found.';
		}
		if (!data.password) {
			data.errors['password'] = 'Password not specified.';
		}
		if (!data.repeatedPassword) {
			data.errors['repeatedPassword'] = 'Repeated password is not specified.';
		}
		else if (data.password !== data.repeatedPassword) {
			data.errors['repeatedPassword'] = 'Passwords do not match.';
		}

		if (Object.keys(data.errors).length === 0) {
			await axios.post(`${process.env.API_SSO}/${process.env.API_SSO_RESET}`, {
				verifyKey,
				password: data.password,
				repeatedPassword: data.repeatedPassword,
			});

			Store().dispatch({
				type: prefix +'.reset',
				payload: {
					reset: true,
				},
			});
			navigate(`/${process.env.PAGE_SIGN_IN}`);
		}
		else {
			Store().dispatch({
				type: prefix +'.reset',
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

		return snackbar(errorMessage, { variant: 'error' });
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerReset = (state, action) => {
	return ({
		...(action.payload || {}),
		loader: false,
	});
};
