
const systemStatusForm = {
	parentName: 'filesSystemStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'systems/statuses/:id',
	pageTitle: 'Status',

	id: 'files-system-statuses-form',
	storeName: 'files-system-statuses-form',
	apiUrl: 'system-status',

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

export default systemStatusForm;
