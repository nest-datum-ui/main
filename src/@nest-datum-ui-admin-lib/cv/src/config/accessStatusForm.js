
const accessStatusForm = {
	parentName: 'cvAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'cv-accesses-statuses-form',
	storeName: 'cv-accesses-statuses-form',
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
