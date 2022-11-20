
const regExp = /[^a-z0-9_]/gi;
const column = (e, testFlag) => {
	if (testFlag) {
		return !regExp.test(e);
	}
	e.target.value = e.target.value.replace(regExp,'');
};

export default column;
