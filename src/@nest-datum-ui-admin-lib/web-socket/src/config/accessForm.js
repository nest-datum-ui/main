
const accessForm = {
	parentName: 'webSocketAccess',
	optionName: 'webSocketAccessOption',
	optionListName: 'webSocketAccessOptionList',
	optionFormName: 'webSocketAccessOptionForm',
	statusName: 'webSocketAccessStatus',
	statusListName: 'webSocketAccessStatusList',
	relationListName: 'webSocketAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'web-socket-accesses-form',
	storeName: 'web-socket-accesses-form',
	apiUrl: 'access',

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

export default accessForm;
