import Store from '@nest-datum-ui/components/Store';
import { 
	hookNavigate, 
	hookSnackbar,
} from '@nest-datum-ui/utils/hooks';
import { fireRefresh as actionAuthRefresh } from '@nest-datum-ui/components/Store/auth/actions/refresh.js';

const autoAuthByToken = () => {
	const navigate = hookNavigate();
	const snackbar = hookSnackbar();
	const loginFlag = (Store()
		.getState()
		.auth || {})
		.loginFlag;

	if (!loginFlag) {
		actionAuthRefresh({
			url: process.env.SERVICE_SSO,
			path: 'user/refresh',
		})(navigate, snackbar);
	}
};

export default autoAuthByToken;
