
const fieldForm = {
	parentName: 'dictionaryField',
	optionName: 'dictionaryFieldOption',
	optionListName: 'dictionaryFieldOptionList',
	optionFormName: 'dictionaryFieldOptionForm',
	statusName: 'dictionaryFieldStatus',
	statusListName: 'dictionaryFieldStatusList',
	relationListName: 'dictionaryFieldFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Field',

	pageUrl: 'fields/:id',
	pageTitle: 'Field',

	id: 'dictionary-field-form',
	storeName: 'dictionary-field-form',
	apiUrl: 'field',

	entity: 'fieldId', 
	entityRelation: 'fieldOptionId',
	entityOptionRelation: 'fieldFieldOptionId',
	relation: 'fieldFieldOptions', 
	relationContent: 'fieldFieldFieldOptions',

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

export default fieldForm;
