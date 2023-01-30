import { hookNavigate } from '@nest-datum-ui/utils/hooks';

const redirectToSignIn = (authFlag) => {
	const navigate = hookNavigate();

	if (authFlag === false) {
		navigate(`/${process.env.PAGE_SIGN_IN}`)
	}
};

export default redirectToSignIn;
