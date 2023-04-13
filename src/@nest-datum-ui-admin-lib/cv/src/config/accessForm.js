
const accessForm = {
	parentName: 'cvAccess',
	optionName: 'cvAccessOption',
	optionListName: 'cvAccessOptionList',
	optionFormName: 'cvAccessOptionForm',
	statusName: 'cvAccessStatus',
	statusListName: 'cvAccessStatusList',
	relationListName: 'cvAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'cv-accesses-form',
	storeName: 'cv-accesses-form',
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
