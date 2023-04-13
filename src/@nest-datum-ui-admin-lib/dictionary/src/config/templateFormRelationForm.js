import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const templateFormRelationForm = {
	id: 'dictionary-template-option-relations-form',
	storeName: 'dictionary-template-option-relations-form',
	apiUrl: 'template/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'template/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'dictionary-template-option-relations-form',
		apiUrl: 'template',
		name: 'templateId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default templateFormRelationForm;
