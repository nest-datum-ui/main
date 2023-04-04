
const userOptionForm = {
	parentName: 'ssoUserOption',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'users/options/:id',
	pageTitle: 'Option',

	id: 'sso-user-options-form',
	storeName: 'sso-user-options-form',
	apiUrl: 'user-option',

	relations: {
		apiUrl: 'user/:id/options',
	},

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

export default userOptionForm;
