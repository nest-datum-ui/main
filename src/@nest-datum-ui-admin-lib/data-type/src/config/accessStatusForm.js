
const dataTypeAccessStatusForm = {
	parentName: 'dataTypeAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'data-type-accesses-statuses-form',
	storeName: 'data-type-accesses-statuses-form',
	apiUrl: 'access-status',

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

export default dataTypeAccessStatusForm;
