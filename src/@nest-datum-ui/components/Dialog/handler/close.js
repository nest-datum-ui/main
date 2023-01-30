import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';

const close = (e, id, loader, onClose) => {
	if (loader !== true) {
		return (typeof onClose === 'function')
			? onClose(e)
			: actionDialogClose(id)();
	}
};

export default close;
