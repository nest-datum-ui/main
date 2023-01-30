import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'cv',
		text: 'CV',
	}, {
		key: `/cv/report`,
		text: 'Reports',
	}, {
		key: `/cv/report/${entityId}`,
		text: (entityId === '0')
			? 'Create new report'
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
