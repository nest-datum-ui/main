import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsValidateEmail from '@nest-datum-ui/utils/validate/email.js';
import { fireProp } from './prop.js';

/**
 * @return {Function}
 */
export const fireRecovery = ({
	url,
	path,
}) => async (snackbar = () => {}, prefix = 'auth') => {
	let apiPath = '';

	try {
		fireProp('loader', true)();

		apiPath = `${url}/${path}`;

		const data = { ...Store().getState()[prefix] };

		if (!data.email
			|| !utilsValidateEmail(data.email, true)) {
			data.errors['email'] = 'The email is in the wrong format.';
		}

		if (Object.keys(data.errors).length === 0) {
			await axios.post(apiPath, {
				email: data.email,
			});

			Store().dispatch({
				type: prefix +'.recovery',
				payload: {
					recovery: true,
				},
			});
		}
		else {
			Store().dispatch({
				type: prefix +'.recovery',
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
export const reducerRecovery = (state, action) => {
	return ({
		...(action.payload || {}),
		loader: false,
	});
};
