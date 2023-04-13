
const fieldOptionForm = {
	parentName: 'formsFieldOption',
	relationListName: 'formsFieldOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'fields/options/:id',
	pageTitle: 'Option',

	id: 'forms-field-options-form',
	storeName: 'forms-field-options-form',
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
