import axios from 'axios';
import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { actionApiFormClear } from '@nest-datum-ui/Store';

let timeout;

export const fireRefresh = async (storeName, apiUrl) => {
	try {
		const accessToken = localStorage.getItem(`${process.env.URL_UI}_accessToken`);
		const refreshToken = localStorage.getItem(`${process.env.URL_UI}_refreshToken`);

		if (!utilsCheckStr(accessToken)
			|| !utilsCheckStr(refreshToken)) {
			return actionApiFormClear(storeName, { autoLoginFlag: false })();
		}
		const request = await axios.post(apiUrl, { accessToken, refreshToken });

		if (request.data.accessToken
			&& request.data.refreshToken) {
			localStorage.setItem(`${process.env.URL_UI}_accessToken`, request.data.accessToken);
			localStorage.setItem(`${process.env.URL_UI}_refreshToken`, request.data.refreshToken);

			actionApiFormClear(storeName, { ...request.data.userData, authFlag: true })();
			clearTimeout(timeout);

			return (timeout = setTimeout(() => fireRefresh(), Number(process.env.STORE_AUTH_REFRESH_TOKEN_TIMEOUT || 70000)));
		}
		return actionApiFormClear(storeName, { autoLoginFlag: false })();
	}
	catch (err) {
		clearTimeout(timeout);

		return actionApiFormClear(storeName, { autoLoginFlag: false })();
	}
};
