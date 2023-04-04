
const userStatusForm = {
	parentName: 'ssoUserStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'users/statuses/:id',
	pageTitle: 'Status',

	id: 'sso-user-statuses-form',
	storeName: 'sso-user-statuses-form',
	apiUrl: 'user-status',

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

export default userStatusForm;
