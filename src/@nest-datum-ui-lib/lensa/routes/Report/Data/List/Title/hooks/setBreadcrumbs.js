import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'lensa',
		text: 'Lensa',
	}, {
		key: '/lensa/report',
		text: 'Reports',
	}])();
};

export default setBreadcrumbs;
