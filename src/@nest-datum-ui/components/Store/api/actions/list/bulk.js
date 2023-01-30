import Store from '@nest-datum-ui/components/Store';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireListBulk = async (storeListName, e) => {
	actionApiListProp(storeListName, 'selected', (e.target.checked)
		? ((Store()
			.getState()
			.api
			.list[storeListName] || {})
			.data || [])
			.map((item) => item.id)
		: [])();
};
