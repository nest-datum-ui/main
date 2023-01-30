import { useLocation } from 'react-router-dom';

const useServiceKey = () => {
	const { pathname } = useLocation();
	
	return pathname.split('/')[1] || '';
};

export default useServiceKey;
