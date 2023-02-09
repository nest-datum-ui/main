import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'mail',
		text: 'Mail',
	}, {
		key: '/mail/report',
		text: 'Reports',
	}, {
		key: `/mail/report/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
