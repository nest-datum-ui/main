import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';

const useUserData = () => {
	let firstname = '',
		lastname = '',
		avatar = '';

	useSelector(selectorMainExtract([ 'auth', 'userUserOptions' ], (userUserOptions) => (userUserOptions || []).forEach((item) => {
		switch (item['userOption']['id']) {
			case 'sso-user-option-avatar':
				try {
					avatar = JSON.parse(item['content']);
				}
				catch (err) {
					avatar = item['content'];
				}
				break;
			case 'sso-user-option-firstname':
				firstname = item['content'];
				break;
			case 'sso-user-option-lastname':
				lastname = item['content'];
				break;
			default:
				break;
		}
	})));

	return {
		firstname,
		lastname,
		avatar,
	};
};

export default useUserData;
