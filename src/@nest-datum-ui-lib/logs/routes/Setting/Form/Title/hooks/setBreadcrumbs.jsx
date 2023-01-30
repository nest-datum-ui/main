import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'logs',
		text: 'Logs',
	}, {
		key: `/logs/settings`,
		text: 'Settings',
	}, {
		key: `/logs/settings/${entityId}`,
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
