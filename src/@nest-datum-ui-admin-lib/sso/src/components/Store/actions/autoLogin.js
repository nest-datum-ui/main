import Store from '@nest-datum-ui/Store';
import { fireRefresh } from './refresh.js';

export const fireAutoLogin = (storeName, apiUrl) => {
	const authFlag = ((Store()
		.getState()
		.api
		.form || {})[storeName] || {})
		.authFlag;

	if (!authFlag) {
		fireRefresh(storeName, apiUrl);
	}
};
