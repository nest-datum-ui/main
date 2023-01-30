import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'cv',
		text: 'CV',
	}, {
		key: `/cv/settings`,
		text: 'Settings',
	}])();
};

export default setBreadcrumbs;
