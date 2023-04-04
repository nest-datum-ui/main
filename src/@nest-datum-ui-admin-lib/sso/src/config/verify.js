import { createRouteContext } from '@nest-datum-ui/Context';

const verify = createRouteContext({
	pageTitle: 'Activation',
	pageUrl: 'verify',

	id: 'sso-verify',
	storeName: 'sso-verify',
	apiUrl: 'user/verify',
});

export default verify;
