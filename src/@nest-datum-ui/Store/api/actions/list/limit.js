import { fireListMerge } from './merge.js';

export const fireListLimit = async (storeListName, e) => await fireListMerge(storeListName, {
	loader: true,
	page: 1,
	limit: e.target.value,
})();
