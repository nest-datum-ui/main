
const submit = (e, name, onSearch = () => {}) => {
	e.preventDefault();

	onSearch(e.target.elements[name].value);
};

export default submit;
