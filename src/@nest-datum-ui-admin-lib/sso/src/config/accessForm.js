import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { actionDialogOpen } from '@nest-datum-ui/Store';
import Select from 'components/Select';

const accessForm = {
	parentName: 'ssoAccess',
	optionName: 'ssoAccessOption',
	optionListName: 'ssoAccessOptionList',
	optionFormName: 'ssoAccessOptionForm',
	statusName: 'ssoAccessStatus',
	statusListName: 'ssoAccessStatusList',
	relationListName: 'ssoAccessFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Access',

	pageUrl: 'accesses/:id',
	pageTitle: 'Access',

	id: 'sso-accesses-form',
	storeName: 'sso-accesses-form',
	apiUrl: 'access',

	manage: {
		create: {
			text: 'Save',
			order: 0,
		},
		dropOnRemovable: {
			text: 'Disable',
			order: 1,
		},
	},

	relations: {
		title: 'Roles',
		subtitle: 'List of roles that own the current setting.',

		list: {
			id: 'sso-user-option-relations-list',
			storeName: 'sso-user-option-relations-list',
			columnName: 'accessId',
			apiUrl: 'role/access',
			initialPage: 1,
			initialLimit: 9999,
			bulkDeletion: true,
			withForceDropMenu: true,

			manage: {
				dropPermanently: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selected.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selected.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selected })(),
					order: 1,
					variant: 'contained',
					color: 'error',
				},
				create: {
					text: 'Add relation',
					order: 3,
					variant: 'contained',
					color: 'secondary',
					onClick: () => actionDialogOpen('relation')(),
				},
			},
			rowColumns: [{
				name: 'ID',
				id: 'id',
				order: 0,
			}, {
				name: 'Role',
				id: 'roleId',
				order: 1,
			}, {
				name: 'Story',
				id: 'story',
				order: 2,
			}],

			form: {
				id: 'sso-user-option-relations-form',
				storeName: 'sso-user-option-relations-form',
				apiUrl: 'access/:id/role',

				title: 'Role',

				post: {
					apiUrl: 'access/:id/roles',
				},

				fields: [{
					Component: Select,
					storeName: 'sso-user-option-relations-form',
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
			},
		},
	},
};

export default accessForm;
