
const roleStatusForm = {
	parentName: 'ssoRoleStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'roles/statuses/:id',
	pageTitle: 'Status',

	id: 'sso-role-statuses-form',
	storeName: 'sso-role-statuses-form',
	apiUrl: 'role-status',

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

export default roleStatusForm;
