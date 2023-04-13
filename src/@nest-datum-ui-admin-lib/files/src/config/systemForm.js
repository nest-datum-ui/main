
const systemForm = {
	parentName: 'filesSystem',
	optionName: 'filesSystemOption',
	optionListName: 'filesSystemOptionList',
	optionFormName: 'filesSystemOptionForm',
	statusName: 'filesSystemStatus',
	statusListName: 'filesSystemStatusList',
	relationListName: 'filesSystemFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'System',

	pageUrl: 'systems/:id',
	pageTitle: 'System',

	id: 'files-system-form',
	storeName: 'files-system-form',
	apiUrl: 'system',

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

export default systemForm;
