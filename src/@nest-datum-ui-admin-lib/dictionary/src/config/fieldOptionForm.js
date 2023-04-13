
const fieldOptionForm = {
	parentName: 'dictionaryFieldOption',
	relationListName: 'dictionaryFieldOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'fields/options/:id',
	pageTitle: 'Option',

	id: 'dictionary-field-options-form',
	storeName: 'dictionary-field-options-form',
	apiUrl: 'field-option',
	apiRelationUrl: 'field/option/:id',

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

export default fieldOptionForm;
