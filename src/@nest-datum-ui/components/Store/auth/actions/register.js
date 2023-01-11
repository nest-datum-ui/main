import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsValidateEmail from '@nest-datum-ui/utils/validate/email.js';
import { fireProp } from './prop.js';

let timeout;
/**
 * @return {Function}
 */
export const fireRegister = ({
	url,
	path,
}) => async (navigate = () => {}, snackbar = () => {}, prefix = 'auth') => {
	let apiPath = '';

	try {
		fireProp('loader', true)();

		apiPath = `${url}/${path}`;
	
		const data = { ...Store().getState()[prefix] };

		data['errors'] = {};

		if (!data.login
			|| typeof data.login !== 'string') {
			data.errors['login'] = 'The login was not specified.';
		}
		if (!data.firstname
			|| typeof data.firstname !== 'string') {
			data.errors['firstname'] = 'The firstname was not specified.';
		}
		if (!data.lastname
			|| typeof data.lastname !== 'string') {
			data.errors['lastname'] = 'The lastname was not specified.';
		}
		if (!data.email
			|| !utilsValidateEmail(data.email, true)) {
			data.errors['email'] = 'The email is in the wrong format.';
		}
		if (!data.password) {
			data.errors['password'] = 'Password not specified.';
		}
		if ((data.password || '').length < 8) {
			data.errors['password'] = 'Password must be at least 8 characters.';
		}
		if (!/\d/.test(data.password)) {
			data.errors['password'] = 'Password must contain at least one number.';
		}
		if (!/\p{L}/u.test(data.password)) {
			data.errors['password'] = 'Password must contain at least one letter.';
		}
		if (!data.repeatedPassword) {
			data.errors['repeatedPassword'] = 'Repeated password is not specified.';
		}
		else if (data.password !== data.repeatedPassword) {
			data.errors['repeatedPassword'] = 'Passwords do not match.';
		}

		if (Object.keys((data || {}).errors || {}).length === 0) {
			await axios.post(apiPath, {
				login: data.login,
				firstname: data.firstname,
				lastname: data.lastname,
				email: data.email,
				password: data.password,
				repeatedPassword: data.repeatedPassword,
			});

			Store().dispatch({
				type: prefix +'.register',
				payload: {
					register: true,
				},
			});

			clearTimeout(timeout);

			timeout = setTimeout(() => {
				navigate(`/${process.env.PAGE_SIGN_IN}`);
			}, 3000);
		}
		else {
			Store().dispatch({
				type: prefix +'.register',
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
export const reducerRegister = (state, action) => {
	return ({
		...(action.payload || {}),
		loader: false,
	});
};
