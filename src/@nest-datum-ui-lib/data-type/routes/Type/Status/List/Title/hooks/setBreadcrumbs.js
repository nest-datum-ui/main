import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'data-type',
		text: 'Data type',
	}, {
		key: `/data-type/type`,
		text: 'Types',
	}, {
		key: `/data-type/type/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
