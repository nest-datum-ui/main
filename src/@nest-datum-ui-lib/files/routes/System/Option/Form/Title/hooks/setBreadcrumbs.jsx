import React from 'react';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';

const setBreadcrumbs = (entityId, isDeleted) => {
	actionBreadcrumbsListSet('app', [{
		key: '/',
		text: '...',
	}, {
		key: 'files',
		text: 'Files',
	}, {
		key: `/files/system/options`,
		text: 'Options',
	}, {
		key: `/files/system/options/${entityId}`,
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
