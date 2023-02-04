import Store from '@nest-datum-ui/components/Store';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireListPage = async (storeListName, newPage) => {
	const currentPage = Number((Store()
		.getState()
		.api
		.list[storeListName] || {})
		.page);

	if (newPage !== currentPage) {
		actionApiListProp(storeListName, 'loader', true)();
		actionApiListProp(storeListName, 'page', newPage)();
	}
};
