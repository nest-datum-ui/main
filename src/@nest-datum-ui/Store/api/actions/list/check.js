import { getStore } from '../../../Store.js';
import { fireListMerge } from './merge.js';

export const fireListCheck = (storeName, id, isNotDelete, isDeleted) => (e) => {
	const {
		selectedForDrop = [],
		selectedForDropPermanently = [],
		selected = [],
	} = getStore()
		.getState()
		.api
		.list[storeName] || {};
	const selectedIndex = selected.indexOf(id);

	if (e.target.checked && selectedIndex < 0) {
		selected.push(id);

		if (!isNotDelete) {
			isDeleted
				? selectedForDropPermanently.push(id)
				: selectedForDrop.push(id);
		}
	}
	else {
		const selectedForDropIndex = selectedForDrop.indexOf(id);
		const selectedForDropPermanentlyIndex = selectedForDropPermanently.indexOf(id);

		selected.splice(selectedIndex, 1);

		(selectedForDropIndex >= 0) && (selectedForDrop.splice(selectedForDropIndex, 1));
		(selectedForDropPermanentlyIndex >= 0) && (selectedForDropPermanently.splice(selectedForDropPermanentlyIndex, 1));
	}
	return fireListMerge(storeName, {
		selected: [ ...selected ],
		selectedForDrop: [ ...selectedForDrop ],
		selectedForDropPermanently: [ ...selectedForDropPermanently ],
	})();
};

export default fireListCheck;
