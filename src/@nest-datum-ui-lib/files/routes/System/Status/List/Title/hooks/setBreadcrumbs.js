import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'files',
		text: 'Files',
	}, {
		key: `/files/system/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
