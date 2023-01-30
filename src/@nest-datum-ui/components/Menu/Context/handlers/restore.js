
const restore = (e, onRestore, onClose) => {
	onRestore(e);
	onClose();
};

export default restore;
