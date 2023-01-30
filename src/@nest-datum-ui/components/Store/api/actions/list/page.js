import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireListPage = async (storeListName, newPage) => {
	actionApiListProp(storeListName, 'loader', true)();
	actionApiListProp(storeListName, 'page', newPage)();
};
