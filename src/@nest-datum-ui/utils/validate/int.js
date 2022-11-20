
const regExp = /[^0-9]/gi;
const int = (e, testFlag) => {
	if (testFlag) {
		return !regExp.test(e);
	}
	e.target.value = e.target.value.replace(regExp,'');
};

export default int;
