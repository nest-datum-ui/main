
const edit = (e, onEdit, onClose, id) => {
	onEdit(e, id);
	onClose();
};

export default edit;
