
const accessStatusForm = {
	parentName: 'filesAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'files-accesses-statuses-form',
	storeName: 'files-accesses-statuses-form',
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

export default accessStatusForm;
