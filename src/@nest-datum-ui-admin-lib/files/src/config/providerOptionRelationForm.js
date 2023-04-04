import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const providerOptionRelationForm = {
	id: 'files-option-relations-form',
	storeName: 'files-option-relations-form',
	apiUrl: 'provider/:id/option',

	title: 'Provider',

	post: {
		apiUrl: 'provider/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'files-option-relations-form',
		apiUrl: 'provider',
		name: 'providerId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default providerOptionRelationForm;
