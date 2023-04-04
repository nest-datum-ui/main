import { getStore } from '../../../Store.js';
import { fireListMerge } from './merge.js';

export const fireListPage = async (storeListName, newPage, callback = () => {}) => {
	const currentPage = Number((getStore()
		.getState()
		.api
		.list[storeListName] || {})
		.page);

	if (newPage !== currentPage) {
		await fireListMerge(storeListName, {
			loader: true,
			page: newPage,
		})();

		return callback(currentPage, newPage);
	}
};
