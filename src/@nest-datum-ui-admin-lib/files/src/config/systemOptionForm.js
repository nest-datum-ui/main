
const systemOptionForm = {
	parentName: 'filesSystemOption',
	relationListName: 'filesSystemOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'systems/options/:id',
	pageTitle: 'Option',

	id: 'files-system-options-form',
	storeName: 'files-system-options-form',
	apiUrl: 'system-option',
	apiRelationUrl: 'system/option/:id',

	entity: 'systemId', 
	entityRelation: 'systemOptionId',
	entityOptionRelation: 'systemSystemOptionId',
	relation: 'systemSystemOptions', 
	relationContent: 'systemSystemSystemOptions',

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

export default systemOptionForm;
