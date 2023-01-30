import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'forms',
		text: 'Forms',
	}, {
		key: `/forms/form/statuses`,
		text: 'Statuses',
	}])();
};

export default setBreadcrumbs;
