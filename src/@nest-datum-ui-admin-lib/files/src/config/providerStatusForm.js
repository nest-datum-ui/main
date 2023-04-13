
const providerStatusForm = {
	parentName: 'filesProviderStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'providers/statuses/:id',
	pageTitle: 'Status',

	id: 'files-provider-statuses-form',
	storeName: 'files-provider-statuses-form',
	apiUrl: 'provider-status',

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

export default providerStatusForm;
