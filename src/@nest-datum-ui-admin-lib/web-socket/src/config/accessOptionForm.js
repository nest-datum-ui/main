
const accessOptionForm = {
	parentName: 'webSocketAccessOption',
	relationListName: 'webSocketAccessOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'accesses/options/:id',
	pageTitle: 'Option',

	id: 'web-socket-accesses-options-form',
	storeName: 'web-socket-accesses-options-form',
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
