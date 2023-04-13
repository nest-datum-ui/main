
const providerForm = {
	parentName: 'filesProvider',
	optionName: 'filesProviderOption',
	optionListName: 'filesProviderOptionList',
	optionFormName: 'filesProviderOptionForm',
	statusName: 'filesProviderStatus',
	statusListName: 'filesProviderStatusList',
	relationListName: 'filesProviderFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Provider',

	pageUrl: 'providers/:id',
	pageTitle: 'Provider',

	id: 'files-provider-form',
	storeName: 'files-provider-form',
	apiUrl: 'provider',

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

export default providerForm;
