
const accessStatusForm = {
	parentName: 'ssoAccessStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'accesses/statuses/:id',
	pageTitle: 'Status',

	id: 'sso-accesses-statuses-form',
	storeName: 'sso-accesses-statuses-form',
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
