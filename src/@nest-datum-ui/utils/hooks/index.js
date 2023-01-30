import useServiceKey from './useServiceKey.js';
import useUrlPathname from './useUrlPathname.js';
import useLogin from './useLogin.js';
import useUserData from './useUserData.js';
import hooksFind from './find.js';

const hooks = {};

export const get = (name) => hooks[name];

export const set = (name, value) => (hooks[name] = value);

export const hookNavigate = () => hooks['navigate'];

export const hookLocation = () => hooks['location'];

export const hookSnackbar = () => hooks['snackbar'];

export {
	hooksFind,
	useServiceKey,
	useUrlPathname,
	useLogin,
	useUserData,
};
