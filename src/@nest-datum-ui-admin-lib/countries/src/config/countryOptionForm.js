
const countryOptionForm = {
	parentName: 'countriesCountryOption',
	relationListName: 'countriesCountryOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'countries/options/:id',
	pageTitle: 'Option',

	id: 'countries-country-options-form',
	storeName: 'countries-country-options-form',
	apiUrl: 'country-option',
	apiRelationUrl: 'country/option/:id',

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

export default countryOptionForm;
