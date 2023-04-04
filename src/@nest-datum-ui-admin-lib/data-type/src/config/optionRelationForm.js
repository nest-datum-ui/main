import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const optionRelationForm = {
	id: 'data-type-option-relations-form',
	storeName: 'data-type-option-relations-form',
	apiUrl: 'type/:id/option',

	title: 'Type',

	post: {
		apiUrl: 'type/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'data-type-option-relations-form',
		apiUrl: 'type',
		name: 'typeId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default optionRelationForm;
