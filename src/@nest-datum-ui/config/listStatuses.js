import { createRouteContext } from '@nest-datum-ui/Context';

const listStatuses = createRouteContext({
	id: 'statuses-list',
	storeName: 'statuses-list',
	
	bulkDeletion: true,
	search: true,
	manage: {
		create: {
			text: 'Create',
			to: '0',
			order: 0,
			// component: ButtonCreate,
			// onClick,
		},
	},
	filters: {
		visibility: true,
		deletionPossibility: true,
		// CustomComponent,
	},
	pagination: {
		range: [ 5, 10, 20, 50 ],
		displayOnTop: {
			ifLengthOverLimit: true,
		},
	},
	contextMenu: {
		edit: true,
		copy: true,
		dropOnRemovable: true,
	},
	rowColumns: [{
		name: 'ID',
		id: 'id',
		width: '33%',
		sort: true,
		order: 0,
	}, {
		name: 'Main',
		id: 'main',
		width: '33%',
		order: 1,
	}, {
		name: 'Story',
		id: 'createdAt',
		width: '33%',
		sort: true,
		order: 2,
	}],
});

export default listStatuses;
