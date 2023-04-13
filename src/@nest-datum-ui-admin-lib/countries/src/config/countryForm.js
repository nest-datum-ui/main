
const countryForm = {
	parentName: 'countriesCountry',
	optionName: 'countriesCountryOption',
	optionListName: 'countriesCountryOptionList',
	optionFormName: 'countriesCountryOptionForm',
	statusName: 'countriesCountryStatus',
	statusListName: 'countriesCountryStatusList',
	relationListName: 'countriesCountryFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Countries',

	pageUrl: 'countries/:id',
	pageTitle: 'Country',

	id: 'countries-country-form',
	storeName: 'countries-country-form',
	apiUrl: 'country',

	entity: 'countryId', 
	entityRelation: 'countryOptionId',
	entityOptionRelation: 'countryCountryOptionId',
	relation: 'countryCountryOptions', 
	relationContent: 'countryCountryCountryOptions',

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

export default countryForm;
