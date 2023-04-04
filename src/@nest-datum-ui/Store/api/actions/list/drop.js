import { fireOpen as actionDialogOpen } from '../../../dialog/actions/open.js';

export const fireListDrop = async (storeListName, entityId) => actionDialogOpen(storeListName, { entityId })();;
