
const accessOptionForm = {
	parentName: 'dataTypeAccessOption',
	relationListName: 'dataTypeAccessOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'accesses/options/:id',
	pageTitle: 'Option',

	id: 'data-type-accesses-options-form',
	storeName: 'data-type-accesses-options-form',
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
