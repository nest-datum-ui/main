
const accessOptionForm = {
	parentName: 'dictionaryAccessOption',
	relationListName: 'dictionaryAccessOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'accesses/options/:id',
	pageTitle: 'Option',

	id: 'dictionary-accesses-options-form',
	storeName: 'dictionary-accesses-options-form',
	apiUrl: 'access-option',
	apiRelationUrl: 'access/option/:id',

	entity: 'accessId', 
	entityRelation: 'accessOptionId',
	entityOptionRelation: 'accessAccessOptionId',
	relation: 'accessAccessOptions', 
	relationContent: 'accessAccessAccessOptions',

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

export default accessOptionForm;
