import Store from '@nest-datum-ui/Store';
import {
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';

const findFilterItem = (storeListName, values = []) => {
	const filters = values.slice(1, values.length);
	const data = (((Store()
		.getState()
		.api || {})
		.list || {})[storeListName] || {})
		.data;

	if (utilsCheckArr(data)) {
		const output = [];

		filters.forEach((id) => {
			const filterData = data.find((item) => item.id === id);

			if (utilsCheckObj(filterData)) {
				output.push(filterData);
			}
		});
		return output.map((item) => ({
			value: item.id, 
			text: item.name,
		}));
	}
};

export default findFilterItem;
