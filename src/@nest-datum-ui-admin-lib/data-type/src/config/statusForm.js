
const statusForm = {
	parentName: 'dataTypeStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'types/statuses/:id',
	pageTitle: 'Status',

	id: 'data-type-type-statuses-form',
	storeName: 'data-type-type-statuses-form',
	apiUrl: 'type-status',

	manage: {
		create: {
			text: 'Save',
			order: 0,
		},
		dropOnRemovable: {
			text: 'Disable',
			order: 1,
		},
	},
};

export default statusForm;
