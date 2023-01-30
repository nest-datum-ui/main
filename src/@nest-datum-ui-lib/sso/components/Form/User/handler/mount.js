import Store from '@nest-datum-ui/components/Store';
import { v4 as uuidv4 } from 'uuid';
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
		const id = uuidv4();
		const listOptionsItem = listOptions[i];

		listOptions[i]['userUserOptions'] = [{
			userId: listOptionValue.id,
			userOptionId: listOptions[i].id,
			id,
			userUserUserOptions: listOptionValueData
				.filter((item) => item.userOptionId === listOptionsItem.id)
				.map((item) => ({
					id: item.id,
					userUserOptionId: id,
					userId: item.userId,
					content: item.content,
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
