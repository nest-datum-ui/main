import { createRouteContext } from '@nest-datum-ui/Context';

const SignIn = createRouteContext({
	pageTitle: 'Sign in',
	pageUrl: 'sign-in',
			
	id: 'sso-sign-in',
	storeName: 'sso-sign-in',
	apiUrl: 'user/login',
});

export default SignIn;
