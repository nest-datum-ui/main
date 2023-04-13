
const accessOptionForm = {
	parentName: 'jobsAccessOption',
	relationListName: 'jobsAccessOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'accesses/options/:id',
	pageTitle: 'Option',

	id: 'jobs-accesses-options-form',
	storeName: 'jobs-accesses-options-form',
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
