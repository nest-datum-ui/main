
const countryStatusForm = {
	parentName: 'countriesCountryStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'countries/statuses/:id',
	pageTitle: 'Status',

	id: 'countries-country-statuses-form',
	storeName: 'countries-country-statuses-form',
	apiUrl: 'country-status',

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

export default countryStatusForm;
