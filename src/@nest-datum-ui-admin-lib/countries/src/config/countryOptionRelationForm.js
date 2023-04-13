import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const countryOptionRelationForm = {
	id: 'countries-country-option-relations-form',
	storeName: 'countries-country-option-relations-form',
	apiUrl: 'country/:id/option',

	title: 'Country',

	post: {
		apiUrl: 'country/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'countries-country-option-relations-form',
		apiUrl: 'country',
		name: 'countryId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default countryOptionRelationForm;
