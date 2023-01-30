import { fireFormRestore as actionApiFormRestore } from '@nest-datum-ui/components/Store/api/actions/form/restore.js';

export const fireListRestore = async (storeListName, entityId) => {
	actionApiFormRestore(storeListName, entityId)();
};
