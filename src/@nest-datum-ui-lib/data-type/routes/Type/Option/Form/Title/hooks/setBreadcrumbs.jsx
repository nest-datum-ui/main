import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'data-type',
		text: 'Data type',
	}, {
		key: `/data-type/type/options`,
		text: 'Options',
	}, {
		key: `/data-type/type/options/${entityId}`,
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
