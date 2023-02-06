import Store from '@nest-datum-ui/components/Store';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { 
	SSO_PATH_USER,
	SSO_PATH_USER_OPTION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';

const mount = () => {
	const listOptions = ((Store()
		.getState()
		.api
		.list || {})[SSO_PATH_USER_OPTION] || {})
		.data || [];
	const listOptionValue = ((((Store()
		.getState()
		.api
		.list || {})[SSO_PATH_USER] || {})
		.data || [])[0] || {});
	const listOptionValueData = listOptionValue.userUserOptions;
	let i = 0;

	while (i < listOptions.length) {
		const listOptionsItem = listOptions[i];
		const id = listOptionsItem.id;

		listOptions[i]['userUserOptions'] = [{
			userId: listOptionValue.userId || '',
			userOptionId: listOptionsItem.id,
			id,
			userUserUserOptions: (listOptionValueData ?? [])
				.filter((item) => item.userOptionId === listOptionsItem.id)
				.map((item) => ({
					id: item.id,
					userUserOptionId: id,
					userId: item.userId || '',
					content: item.content ?? listOptionsItem.defaultValue ?? '',
				})),
			}];
		i++;
	}
	if (listOptions.length > 0) {
		actionApiListProp(SSO_PATH_USER_OPTION, 'data', [ ...listOptions ])();
		actionApiListProp(SSO_PATH_USER_OPTION, 'ready', true)();
	}
};

export default mount;
