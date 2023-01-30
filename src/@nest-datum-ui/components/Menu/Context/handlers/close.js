import { fireClose as actionMenuClose } from '@nest-datum-ui/components/Store/menu/actions/close.js';

const close = (e, onClose = () => {}) => {
	actionMenuClose()();
	onClose(e);
};

export default close;
