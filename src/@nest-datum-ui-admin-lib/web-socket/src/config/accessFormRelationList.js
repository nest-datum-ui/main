import { actionDialogOpen } from '@nest-datum-ui/Store';

const accessFormRelationList = {
	title: 'Roles',
	subtitle: 'List of roles that own the current setting.',
	formName: 'webSocketAccessFormRelationForm',

	id: 'web-socket-role-access-option-relations-list',
	storeName: 'web-socket-role-access-option-relations-list',
	columnName: 'accessId',
	apiUrl: 'role/access',
	initialPage: 1,
	initialLimit: 9999,
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
};

export default accessFormRelationList;
