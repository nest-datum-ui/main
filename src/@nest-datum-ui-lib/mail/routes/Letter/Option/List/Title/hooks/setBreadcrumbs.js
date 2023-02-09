import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'mail',
		text: 'Mail',
	}, {
		key: 'mail/letter',
		text: 'Letters',
	}, {
		key: `/mail/letter/options`,
		text: 'Options',
	}])();
};

export default setBreadcrumbs;
