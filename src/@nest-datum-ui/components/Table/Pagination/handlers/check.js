import Store from '@nest-datum-ui/components/Store';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

const check = (e, storeName, id) => {
	const dataSelected = (Store()
		.getState()
		.api
		.list[storeName] || {})
		.selected || [];
	const dataSelectedIndex = dataSelected.indexOf(id);

	(e.target.checked && dataSelectedIndex < 0)
		? dataSelected.push(id)
		: dataSelected.splice(dataSelectedIndex, 1);
	actionApiListProp(storeName, 'selected', [ ...dataSelected ])();
};

export default check;
