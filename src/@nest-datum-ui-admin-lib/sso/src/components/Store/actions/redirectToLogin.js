import { hookUrlNavigate } from '@nest-datum-ui/Store';

export const fireRedirectToLogin = (authFlag, url) => {
	if (!authFlag) {
		hookUrlNavigate(url);
	}
};
