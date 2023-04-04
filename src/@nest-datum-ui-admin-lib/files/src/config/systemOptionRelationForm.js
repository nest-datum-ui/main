import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const systemOptionRelationForm = {
	id: 'files-option-relations-form',
	storeName: 'files-option-relations-form',
	apiUrl: 'system/:id/option',

	title: 'System',

	post: {
		apiUrl: 'system/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'files-option-relations-form',
		apiUrl: 'system',
		name: 'systemId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default systemOptionRelationForm;
