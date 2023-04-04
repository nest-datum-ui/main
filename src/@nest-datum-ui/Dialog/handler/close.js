import { actionDialogClose } from '@nest-datum-ui/Store';

const close = (e, id, loader, onClose) => {
	if (loader !== true) {
		return (typeof onClose === 'function')
			? onClose(e)
			: actionDialogClose(id)();
	}
};

export default close;
