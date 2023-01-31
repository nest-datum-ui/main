import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'files',
		text: 'Files',
	}, {
		key: '/files/manage',
		text: 'File manager',
	}])();
};

export default setBreadcrumbs;
