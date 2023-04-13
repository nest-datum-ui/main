
const fieldForm = {
	parentName: 'formsField',
	optionName: 'formsFieldOption',
	optionListName: 'formsFieldOptionList',
	optionFormName: 'formsFieldOptionForm',
	statusName: 'formsFieldStatus',
	statusListName: 'formsFieldStatusList',
	relationListName: 'formsFieldFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Field',

	pageUrl: 'fields/:id',
	pageTitle: 'Field',

	id: 'forms-field-form',
	storeName: 'forms-field-form',
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
