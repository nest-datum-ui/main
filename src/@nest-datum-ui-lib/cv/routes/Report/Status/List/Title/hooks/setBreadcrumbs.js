import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'cv',
		text: 'CV',
	}, {
		key: `/cv/report`,
		text: 'Reports',
	}, {
		key: `/cv/report/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
