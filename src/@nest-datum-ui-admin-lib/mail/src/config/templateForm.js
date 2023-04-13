
const templateForm = {
	parentName: 'mailTemplate',
	optionName: 'mailTemplateOption',
	optionListName: 'mailTemplateOptionList',
	optionFormName: 'mailTemplateOptionForm',
	statusName: 'mailTemplateStatus',
	statusListName: 'mailTemplateStatusList',
	relationListName: 'mailTemplateFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Template',

	pageUrl: 'templates/:id',
	pageTitle: 'Template',

	id: 'mail-template-form',
	storeName: 'mail-template-form',
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
