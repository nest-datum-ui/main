
const accessForm = {
	parentName: 'formsAccess',
	optionName: 'formsAccessOption',
	optionListName: 'formsAccessOptionList',
	optionFormName: 'formsAccessOptionForm',
	statusName: 'formsAccessStatus',
	statusListName: 'formsAccessStatusList',
	relationListName: 'formsAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'forms-accesses-form',
	storeName: 'forms-accesses-form',
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
