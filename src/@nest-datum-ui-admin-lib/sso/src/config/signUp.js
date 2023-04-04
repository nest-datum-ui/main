import { createRouteContext } from '@nest-datum-ui/Context';

const SignUp = createRouteContext({
	pageTitle: 'Sign up',
	pageUrl: 'sign-up',
			
	id: 'sso-sign-up',
	storeName: 'sso-sign-up',
	apiUrl: 'user/sign-up',
});

export default SignUp;
