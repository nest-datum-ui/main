
const providerOptionForm = {
	parentName: 'filesProviderOption',
	relationListName: 'filesProviderOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'providers/options/:id',
	pageTitle: 'Option',

	id: 'files-provider-options-form',
	storeName: 'files-provider-options-form',
	apiUrl: 'provider-option',
	apiRelationUrl: 'provider/option/:id',

	entity: 'providerId', 
	entityRelation: 'providerOptionId',
	entityOptionRelation: 'providerProviderOptionId',
	relation: 'providerProviderOptions', 
	relationContent: 'providerProviderProviderOptions',

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

export default providerOptionForm;
