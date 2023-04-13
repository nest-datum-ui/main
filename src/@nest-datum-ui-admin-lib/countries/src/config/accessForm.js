
const accessForm = {
	parentName: 'countriesAccess',
	optionName: 'countriesAccessOption',
	optionListName: 'countriesAccessOptionList',
	optionFormName: 'countriesAccessOptionForm',
	statusName: 'countriesAccessStatus',
	statusListName: 'countriesAccessStatusList',
	relationListName: 'countriesAccessFormRelationList',
	
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'countries-accesses-form',
	storeName: 'countries-accesses-form',
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
