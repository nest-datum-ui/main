
const accessForm = {
	parentName: 'httpAccess',
	optionName: 'httpAccessOption',
	optionListName: 'httpAccessOptionList',
	optionFormName: 'httpAccessOptionForm',
	statusName: 'httpAccessStatus',
	statusListName: 'httpAccessStatusList',
	relationListName: 'httpAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'http-accesses-form',
	storeName: 'http-accesses-form',
	apiUrl: 'access',

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

export default accessForm;
