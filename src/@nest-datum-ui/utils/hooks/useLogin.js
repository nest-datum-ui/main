import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';

const useLogin = () => {
	return useSelector(selectorMainExtract([ 'auth', 'login' ])) ?? '';
};

export default useLogin;
