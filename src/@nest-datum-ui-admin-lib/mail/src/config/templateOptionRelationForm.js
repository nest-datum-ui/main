import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const templateOptionRelationForm = {
	id: 'mail-template-option-relations-form',
	storeName: 'mail-template-option-relations-form',
	apiUrl: 'template/:id/option',

	title: 'Template',

	post: {
		apiUrl: 'template/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'mail-template-option-relations-form',
		apiUrl: 'template',
		name: 'templateId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default templateOptionRelationForm;
