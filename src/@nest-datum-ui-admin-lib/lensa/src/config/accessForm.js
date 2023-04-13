
const accessForm = {
	parentName: 'lensaAccess',
	optionName: 'lensaAccessOption',
	optionListName: 'lensaAccessOptionList',
	optionFormName: 'lensaAccessOptionForm',
	statusName: 'lensaAccessStatus',
	statusListName: 'lensaAccessStatusList',
	relationListName: 'lensaAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'lensa-accesses-form',
	storeName: 'lensa-accesses-form',
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
