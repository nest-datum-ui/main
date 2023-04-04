import { createRouteContext } from '@nest-datum-ui/Context';

const listOptions = createRouteContext({
	id: 'options-list',
	storeName: 'options-list',
	
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
		width: '20%',
		sort: true,
		order: 0,
	}, {
		name: 'Main',
		id: 'main',
		width: '20%',
		order: 1,
	}, {
		name: 'Data type',
		id: 'dataTypeId',
		width: '20%',
		order: 2,
		// component: SsoTypographyRole,
	}, {
		name: 'Regex',
		id: 'regex',
		width: '20%',
		order: 3,
		// component: SsoTypographyRole,
	}, {
		name: 'Story',
		id: 'createdAt',
		width: '20%',
		sort: true,
		order: 5,
	}],
});

export default listOptions;
