import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const systemFormRelationForm = {
	id: 'files-provider-option-relations-form',
	storeName: 'files-provider-option-relations-form',
	apiUrl: 'system/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'system/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'files-provider-option-relations-form',
		apiUrl: 'system',
		name: 'systemId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default systemFormRelationForm;
