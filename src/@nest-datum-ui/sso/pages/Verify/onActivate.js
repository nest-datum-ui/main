import axios from 'axios';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';

let timeout;
const onActivate = async (location, setMessage = () => {}, navigate = () => {}) => {
	const verifyKey = utilsUrlSearchPathItem('verifyKey', location.search);

	if (verifyKey) {
		try {
			const request = await axios.post(`${process.env.SERVICE_SSO}/user/verify`, {
				verifyKey,
			});
			setMessage(request.data.message || 'An error has occurred. Received an empty response when trying to activate an account. The account may not be configured correctly.');
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				navigate(`/${process.env.PAGE_SIGN_IN}`);
			}, 0);
		}
		catch (err) {
			setMessage(err.response
				? (err.response.data
					? err.response.data.message || (err.response.data.error
						? err.response.data.error.text
						: err.message)
					: err.message)
				: err.message);
		}
	}
	else {
		setMessage('Activation key not specified.');
	}
};

export default onActivate;
