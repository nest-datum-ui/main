import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'data-type',
		text: 'Data type',
	}, {
		key: `/data-type/type/options`,
		text: 'Options',
	}])();
};

export default setBreadcrumbs;
