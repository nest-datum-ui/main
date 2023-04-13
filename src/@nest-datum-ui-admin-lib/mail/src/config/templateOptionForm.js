
const templateOptionForm = {
	parentName: 'mailTemplateOption',
	relationListName: 'mailTemplateOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'templates/options/:id',
	pageTitle: 'Option',

	id: 'mail-template-options-form',
	storeName: 'mail-template-options-form',
	apiUrl: 'template-option',
	apiRelationUrl: 'template/option/:id',

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

export default templateOptionForm;
