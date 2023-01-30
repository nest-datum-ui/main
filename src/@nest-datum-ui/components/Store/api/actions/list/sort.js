import { hookNavigate } from '@nest-datum-ui/utils/hooks';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { onChange as onTableCellSortChange } from '@nest-datum-ui/components/Table/Cell/Sort';

export const fireListSort = async (storeListName, key, value) => {
	const navigate = hookNavigate();

	actionApiListProp(storeListName, 'loader', true)();
	
	navigate(window.location.pathname + onTableCellSortChange(key, value));
};
