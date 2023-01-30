import { fireOpen as actionDialogOpen } from '@nest-datum-ui/components/Store/dialog/actions/open.js';

export const fireListDrop = async (storeListName, entityId) => actionDialogOpen(storeListName, { entityId })();;
