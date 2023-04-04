import { actionMenuClose } from '@nest-datum-ui/Store';

const close = (e, onClose = () => {}) => {
	actionMenuClose()();
	onClose(e);
};

export default close;
