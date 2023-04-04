
const roleForm = {
	parentName: 'ssoRole',
	optionName: 'ssoRoleOption',
	optionListName: 'ssoRoleOptionList',
	optionFormName: 'ssoRoleOptionForm',
	statusName: 'ssoRoleStatus',
	statusListName: 'ssoRoleStatusList',
	relationListName: 'ssoRoleFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Role',

	pageUrl: 'roles/:id',
	pageTitle: 'Role',

	id: 'sso-role-form',
	storeName: 'sso-role-form',
	apiUrl: 'role',

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

export default roleForm;
