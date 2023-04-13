
const accessStatusForm = {
	parentName: 'jobsAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'jobs-accesses-statuses-form',
	storeName: 'jobs-accesses-statuses-form',
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
