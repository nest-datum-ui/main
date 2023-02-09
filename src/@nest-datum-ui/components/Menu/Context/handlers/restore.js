
const restore = (e, onRestore, onClose, id) => {
	onRestore(e, id);
	onClose();
};

export default restore;
