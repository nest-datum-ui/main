
const formOptionForm = {
	parentName: 'formsFormOption',
	relationListName: 'formsFormOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'forms/options/:id',
	pageTitle: 'Option',

	id: 'forms-form-options-form',
	storeName: 'forms-form-options-form',
	apiUrl: 'form-option',
	apiRelationUrl: 'form/option/:id',

	entity: 'formId', 
	entityRelation: 'formOptionId',
	entityOptionRelation: 'formFormOptionId',
	relation: 'formFormOptions', 
	relationContent: 'formFormFormOptions',

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

export default formOptionForm;
