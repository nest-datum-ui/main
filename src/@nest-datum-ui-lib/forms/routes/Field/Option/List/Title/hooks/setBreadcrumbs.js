import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'forms',
		text: 'Forms',
	}, {
		key: `/forms/field/options`,
		text: 'Options',
	}])();
};

export default setBreadcrumbs;
