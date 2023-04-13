
const accessForm = {
	parentName: 'mailAccess',
	optionName: 'mailAccessOption',
	optionListName: 'mailAccessOptionList',
	optionFormName: 'mailAccessOptionForm',
	statusName: 'mailAccessStatus',
	statusListName: 'mailAccessStatusList',
	relationListName: 'mailAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'mail-accesses-form',
	storeName: 'mail-accesses-form',
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
