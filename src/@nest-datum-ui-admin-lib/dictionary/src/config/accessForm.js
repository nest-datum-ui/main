
const accessForm = {
	parentName: 'dictionaryAccess',
	optionName: 'dictionaryAccessOption',
	optionListName: 'dictionaryAccessOptionList',
	optionFormName: 'dictionaryAccessOptionForm',
	statusName: 'dictionaryAccessStatus',
	statusListName: 'dictionaryAccessStatusList',
	relationListName: 'dictionaryAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'dictionary-accesses-form',
	storeName: 'dictionary-accesses-form',
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
