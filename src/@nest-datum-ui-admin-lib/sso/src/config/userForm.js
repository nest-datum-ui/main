
const userForm = {
	parentName: 'ssoUser',
	optionName: 'ssoUserOption',
	optionListName: 'ssoUserOptionList',
	optionFormName: 'ssoUserOptionForm',
	statusName: 'ssoUserStatus',
	statusListName: 'ssoUserStatusList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'User',

	pageUrl: 'users/:id',
	pageTitle: 'User',

	id: 'sso-user-form',
	storeName: 'sso-user-form',
	apiUrl: 'user',

	entity: 'userId', 
	entityRelation: 'userOptionId',
	entityOptionRelation: 'userUserOptionId',
	relation: 'userUserOptions', 
	relationContent: 'userUserUserOptions',

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

export default userForm;
