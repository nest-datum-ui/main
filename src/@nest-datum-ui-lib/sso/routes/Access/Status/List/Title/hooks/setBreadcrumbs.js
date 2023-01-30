import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'sso',
		text: 'SSO',
	}, {
		key: `/sso/access`,
		text: 'Accesses',
	}, {
		key: `/sso/access/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
