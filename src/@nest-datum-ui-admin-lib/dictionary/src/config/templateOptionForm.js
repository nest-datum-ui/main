
const templateOptionForm = {
	parentName: 'dictionaryTemplateOption',
	relationListName: 'dictionaryTemplateOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'templates/options/:id',
	pageTitle: 'Option',

	id: 'dictionary-template-options-form',
	storeName: 'dictionary-template-options-form',
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
