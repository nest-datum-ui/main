import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const accessFormRelationForm = {
	id: 'dictionary-role-access-option-relations-form',
	storeName: 'dictionary-role-access-option-relations-form',
	apiUrl: 'access/:id/role',
	title: 'Role',
	post: {
		apiUrl: 'access/:id/roles',
	},
	fields: [{
		Component: Select,
		storeName: 'dictionary-role-access-option-relations-form',
		apiUrl: `${process.env.URL_API_SSO}/role`,
		name: 'roleId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId, relationsData) => ((relationsData || []).data || []).length > 0
			? ({ id: [ '$Not', ...(relationsData || []).data.map((item) => item.roleId) ] })
			: ({}),
		check: [ utilsCheckStrId ]
	}],
};

export default accessFormRelationForm;
