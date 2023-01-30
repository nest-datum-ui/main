import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'http',
		text: 'HTTP gateway',
	}, {
		key: `/http/settings`,
		text: 'Settings',
	}, {
		key: `/http/settings/${entityId}`,
		text: (entityId === '0')
			? 'Create new setting'
			: <span
				style={{
					textDecoration: isDeleted
						? 'line-through'
						: 'initial',
				}}>
				{entityId}
			</span>,
	}])();
};

export default setBreadcrumbs;
