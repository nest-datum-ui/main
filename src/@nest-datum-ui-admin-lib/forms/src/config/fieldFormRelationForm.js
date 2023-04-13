import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const fieldFormRelationForm = {
	id: 'forms-field-option-relations-form',
	storeName: 'forms-field-option-relations-form',
	apiUrl: 'field/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'field/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'forms-field-option-relations-form',
		apiUrl: 'field',
		name: 'fieldId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default fieldFormRelationForm;
