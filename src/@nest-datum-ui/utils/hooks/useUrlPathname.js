import { useLocation } from 'react-router-dom';

const useUrlPathname = () => {
	const { pathname } = useLocation();

	return pathname.substring(1) +'/';
};

export default useUrlPathname;
