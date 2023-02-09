
const drop = (e, onDrop, onClose, id) => {
	onDrop(e, id);
	onClose();
};

export default drop;
