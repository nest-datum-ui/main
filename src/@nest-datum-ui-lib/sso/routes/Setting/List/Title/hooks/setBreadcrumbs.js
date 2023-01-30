import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'sso',
		text: 'Sso',
	}, {
		key: `/sso/settings`,
		text: 'Settings',
	}])();
};

export default setBreadcrumbs;
