import { fireSchema as actionBreadcrumbsSchema } from '@nest-datum-ui/components/Store/breadcrumbs/actions/schema.js';
import { fireShow as actionLoaderShow } from '@nest-datum-ui/components/Store/loader/actions/show.js';
import { fireHide as actionLoaderHide } from '@nest-datum-ui/components/Store/loader/actions/hide.js';

let timeout;
const clickWithUnmountLoader = (e, disableUnmountFlag, onClick = () => {}) => {
	if (!disableUnmountFlag) {
		actionBreadcrumbsSchema()();
		actionLoaderShow('unmount')();
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			actionLoaderHide('unmount')();
		}, 600);
	}
	onClick(e);
};

export default clickWithUnmountLoader;
