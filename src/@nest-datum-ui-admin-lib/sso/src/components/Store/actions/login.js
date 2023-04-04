import axios from 'axios';
import {
	strPassword as utilsCheckStrPassword,
	strUserName as utilsCheckStrUserName,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	hookUrlNavigate, 
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';
import { fireRefresh } from './refresh.js';

let timeout;

export const fireLogin = async (storeName, apiUrl) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const {
			login,
			password,
		} = await utilsValidateStore(storeName, {
			login: {
				text: 'Login is not valid.',
				checkOr: [
					utilsCheckStrUserName,
					utilsCheckStrEmail,
				],
			},
			password: {
				text: 'Password not specified.',
				check: [
					utilsCheckStrPassword,
				],
			},
		});

		if (login && password) {
			const request = await axios.post(apiUrl, { login, password });

			if (request.data.accessToken
				&& request.data.refreshToken) {
				localStorage.setItem(`${process.env.URL_UI}_accessToken`, request.data.accessToken);
				localStorage.setItem(`${process.env.URL_UI}_refreshToken`, request.data.refreshToken);

				clearTimeout(timeout);
				actionApiFormProp(storeName, 'authFlag', true)();

				timeout = setTimeout(() => fireRefresh(), Number(process.env.STORE_AUTH_REFRESH_TOKEN_TIMEOUT || 70000));

				setTimeout(() => {
					hookUrlNavigate(`/${process.env.ROUTE_AUTHED}`);
					actionApiFormClear(storeName, { ...request.data.userData, authFlag: true })();
				}, 0);
			}
		}
	}
	catch (err) {
		actionApiFormClear(storeName)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
