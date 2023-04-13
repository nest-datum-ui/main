
const accessForm = {
	parentName: 'jobsAccess',
	optionName: 'jobsAccessOption',
	optionListName: 'jobsAccessOptionList',
	optionFormName: 'jobsAccessOptionForm',
	statusName: 'jobsAccessStatus',
	statusListName: 'jobsAccessStatusList',
	relationListName: 'jobsAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'jobs-accesses-form',
	storeName: 'jobs-accesses-form',
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
