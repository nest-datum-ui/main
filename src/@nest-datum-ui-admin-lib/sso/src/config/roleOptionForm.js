
const roleOptionForm = {
	parentName: 'ssoRoleOption',
	relationListName: 'ssoRoleOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'roles/options/:id',
	pageTitle: 'Option',

	id: 'sso-role-options-form',
	storeName: 'sso-role-options-form',
	apiUrl: 'role-option',
	apiRelationUrl: 'role/option/:id',

	entity: 'roleId', 
	entityRelation: 'roleOptionId',
	entityOptionRelation: 'roleRoleOptionId',
	relation: 'roleRoleOptions', 
	relationContent: 'roleRoleRoleOptions',

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

export default roleOptionForm;
