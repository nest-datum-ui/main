import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'registry',
		text: 'Registry',
	}, {
		key: '/registry/serv',
		text: 'Services',
	}])();
};

export default setBreadcrumbs;
