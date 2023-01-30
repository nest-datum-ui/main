import { fireShow as actionLoaderShow } from '@nest-datum-ui/components/Store/loader/actions/show.js';
import { fireHide as actionLoaderHide } from '@nest-datum-ui/components/Store/loader/actions/hide.js';

let timeout;
const clickWithUnmountLoader = (e, disableUnmountFlag, onClick = () => {}) => {
	if (!disableUnmountFlag) {
		actionLoaderShow('unmount')();
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			actionLoaderHide('unmount')();
		}, 600);
	}
	onClick(e);
};

export default clickWithUnmountLoader;
