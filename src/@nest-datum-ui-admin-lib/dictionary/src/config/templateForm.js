
const templateForm = {
	parentName: 'dictionaryTemplate',
	optionName: 'dictionaryTemplateOption',
	optionListName: 'dictionaryTemplateOptionList',
	optionFormName: 'dictionaryTemplateOptionForm',
	statusName: 'dictionaryTemplateStatus',
	statusListName: 'dictionaryTemplateStatusList',
	relationListName: 'dictionaryTemplateFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Templates',

	pageUrl: 'templates/:id',
	pageTitle: 'Template',

	id: 'dictionary-template-form',
	storeName: 'dictionary-template-form',
	apiUrl: 'template',

	entity: 'templateId', 
	entityRelation: 'templateOptionId',
	entityOptionRelation: 'templateTemplateOptionId',
	relation: 'templateTemplateOptions', 
	relationContent: 'templateTemplateTemplateOptions',

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

export default templateForm;
