import Store from '@nest-datum-ui/components/Store';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

const find = (storeListName, values = []) => {
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

export default find;
