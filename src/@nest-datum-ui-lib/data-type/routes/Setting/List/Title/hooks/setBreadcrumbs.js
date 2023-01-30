import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'data-type',
		text: 'Date type',
	}, {
		key: `/data-type/settings`,
		text: 'Settings',
	}])();
};

export default setBreadcrumbs;
