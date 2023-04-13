
const formForm = {
	parentName: 'formsForm',
	optionName: 'formsFormOption',
	optionListName: 'formsFormOptionList',
	optionFormName: 'formsFormOptionForm',
	statusName: 'formsFormStatus',
	statusListName: 'formsFormStatusList',
	relationListName: 'formsFormFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Form',

	pageUrl: 'forms/:id',
	pageTitle: 'Form',

	id: 'forms-form-form',
	storeName: 'forms-form-form',
	apiUrl: 'form',

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

export default formForm;
