import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const roleOptionRelationForm = {
	id: 'sso-role-option-relations-form',
	storeName: 'sso-role-option-relations-form',
	apiUrl: 'role/:id/option',

	title: 'Role',

	post: {
		apiUrl: 'role/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'sso-role-option-relations-form',
		apiUrl: 'role',
		name: 'roleId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default roleOptionRelationForm;
