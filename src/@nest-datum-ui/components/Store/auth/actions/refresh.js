import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

let timeout;

/**
 * @return {Function}
 */
export const fireRefresh = ({
	url,
	path,
}) => async (navigate = () => {}, snackbar = () => {}, prefix = 'auth') => {
	let apiPath = '';

	try {
		apiPath = `${url}/${path}`;

		const accessToken = localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`);
		const refreshToken = localStorage.getItem(`${process.env.SERVICE_CURRENT}_refreshToken`);

		if (accessToken
			&& refreshToken) {
			const request = await axios.post(apiPath, {
				accessToken,
				refreshToken,
			});

			localStorage.setItem(`${process.env.SERVICE_CURRENT}_accessToken`, request.data.accessToken);
			localStorage.setItem(`${process.env.SERVICE_CURRENT}_refreshToken`, request.data.refreshToken);

			Store().dispatch({
				type: prefix +'.refresh',
				payload: {
					refresh: true,
					authFlag: true,
					accessToken: request.data.accessToken,
					refreshToken: request.data.refreshToken,
					...request.data.userData,
				},
			});
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				fireRefresh({
					url,
					path,
				})(snackbar);
			}, 50000);
		}
		else {
			return navigate(`/${process.env.PAGE_SIGN_IN}`);
		}
	}
	catch (err) {
		clearTimeout(timeout);

		const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		snackbar(errorMessage, { variant: 'error' });

		return navigate(`/${process.env.PAGE_SIGN_IN}`);
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerRefresh = (state, action) => {
	return ({
		...(action.payload || {}),
		loader: false,
	});
};
