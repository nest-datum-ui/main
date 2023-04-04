
const accessForm = {
	parentName: 'dataTypeAccess',
	optionName: 'dataTypeAccessOption',
	optionListName: 'dataTypeAccessOptionList',
	optionFormName: 'dataTypeAccessOptionForm',
	statusName: 'dataTypeAccessStatus',
	statusListName: 'dataTypeAccessStatusList',
	relationListName: 'dataTypeAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'data-type-accesses-form',
	storeName: 'data-type-accesses-form',
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
