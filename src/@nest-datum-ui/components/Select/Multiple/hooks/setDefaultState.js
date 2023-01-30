
const setDefaultState = (isAllowSet, setValueState, value) => {
	if (isAllowSet) {
		setValueState(value);
	}
};

export default setDefaultState;
