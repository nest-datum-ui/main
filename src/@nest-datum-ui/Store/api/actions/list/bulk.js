import { getStore } from '../../../Store.js';
import { fireListMerge } from './merge.js';

export const fireListBulk = async (storeName, e) => {
	const selectedForDrop = [];
	const selectedForDropPermanently = [];
	const selected = [];

	if (e.target.checked) {
		((getStore()
			.getState()
			.api
			.list[storeName] || {})
			.data || [])
			.forEach((item) => {
				if (!item['isNotDelete']) {
					item['isDeleted']
						? selectedForDropPermanently.push(item.id)
						: selectedForDrop.push(item.id);
				}
				selected.push(item.id);
			});
	}
	fireListMerge(storeName, { selected, selectedForDrop, selectedForDropPermanently })();
};
