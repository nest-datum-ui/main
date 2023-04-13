import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const letterFormRelationForm = {
	id: 'mail-letter-option-relations-form',
	storeName: 'mail-letter-option-relations-form',
	apiUrl: 'letter/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'letter/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'mail-letter-option-relations-form',
		apiUrl: 'letter',
		name: 'letterId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default letterFormRelationForm;
