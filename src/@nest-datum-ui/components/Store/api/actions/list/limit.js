import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireListLimit = async (storeListName, e) => {
	actionApiListProp(storeListName, 'loader', true)();
	actionApiListProp(storeListName, 'page', 1)();
	actionApiListProp(storeListName, 'limit', e.target.value)();
};
