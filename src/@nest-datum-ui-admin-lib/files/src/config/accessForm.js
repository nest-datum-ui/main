
const accessForm = {
	parentName: 'filesAccess',
	optionName: 'filesAccessOption',
	optionListName: 'filesAccessOptionList',
	optionFormName: 'filesAccessOptionForm',
	statusName: 'filesAccessStatus',
	statusListName: 'filesAccessStatusList',
	relationListName: 'filesAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'files-accesses-form',
	storeName: 'files-accesses-form',
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
