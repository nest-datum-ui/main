import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = () => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: '/mail',
		text: 'Letters',
	}, {
		key: '/mail/letter',
		text: 'Letters',
	}])();
};

export default setBreadcrumbs;
