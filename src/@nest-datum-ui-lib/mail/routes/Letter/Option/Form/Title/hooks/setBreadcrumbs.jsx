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
		key: `/mail/letter/options`,
		text: 'Options',
	}, {
		key: `/mail/letter/options/${entityId}`,
		text: (entityId === '0')
			? 'Create new option'
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
