import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'mail',
		text: 'Mail',
	}, {
		key: `/mail/letter/statuses`,
		text: 'Statuses',
	}, {
		key: `/mail/letter/statuses/${entityId}`,
		text: (entityId === '0')
			? 'Create new status'
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
