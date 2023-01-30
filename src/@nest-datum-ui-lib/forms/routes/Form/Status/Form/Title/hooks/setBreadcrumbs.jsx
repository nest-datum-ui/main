import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'forms',
		text: 'Forms',
	}, {
		key: `/forms/form/statuses`,
		text: 'Statuses',
	}, {
		key: `/forms/form/statuses/${entityId}`,
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
