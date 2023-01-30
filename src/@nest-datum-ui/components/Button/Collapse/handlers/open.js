
const open = (e, setOpen, onClick) => {
	let newValue;

	setOpen((currentState) => (newValue = !currentState));
	onClick(e, newValue);
};

export default open;
