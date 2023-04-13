import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const fieldOptionRelationForm = {
	id: 'dictionary-field-option-relations-form',
	storeName: 'dictionary-field-option-relations-form',
	apiUrl: 'field/:id/option',

	title: 'Field',

	post: {
		apiUrl: 'field/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'dictionary-field-option-relations-form',
		apiUrl: 'field',
		name: 'fieldId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default fieldOptionRelationForm;
