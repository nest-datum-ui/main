import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'logs',
		text: 'Logs',
	}, {
		key: '/logs/Notification',
		text: 'Notifications',
	}])();
};

export default setBreadcrumbs;
