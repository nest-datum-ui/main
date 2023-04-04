import { actionApiListProp } from '@nest-datum-ui/Store';

const submit = (e, name, onSearch, storeName) => {
	e.preventDefault();

	onSearch(e.target.elements[name].value);
	setTimeout(() => actionApiListProp(storeName, 'page', 1)(), 0);
};

export default submit;
