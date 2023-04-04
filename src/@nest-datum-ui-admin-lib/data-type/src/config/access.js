import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { 
	actionDialogOpen,
	actionApiFormRestore, 
} from '@nest-datum-ui/Store';
import Select from 'components/Select';
// import ssoConfig from '@nest-datum-ui-admin-lib/sso/src/config';

const config = {
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Accesses',

	displayInHeaderTabMenu: true,
	orderInHeaderTabMenu: 1,
	headerTabMenuTitle: 'Accesses',

	pageUrl: 'accesses',
	pageTitle: 'Accesses',

	list: {
		id: 'data-type-accesses-list',
		storeName: 'data-type-accesses-list',
		apiUrl: 'access',
		initialPage: 1,
		initialLimit: 20,
		bulkDeletion: true,
		search: true,
		withContextMenu: true,
		withFilter: true,

		manage: {
			drop: {
				text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Disable checked (${selectedForDrop.length})`,
				showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
				onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('disable-many', { ids: selectedForDrop })(),
				order: 0,
				variant: 'contained',
				color: 'error',
			},
			dropPermanently: {
				text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDropPermanently.length})`,
				showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
				onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDropPermanently })(),
				order: 1,
				variant: 'contained',
				color: 'error',
			},
			restore: {
				text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Restore (${selectedForDropPermanently.length})`,
				showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
				onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently, context) => actionApiFormRestore(context.storeName, { apiUrl: context.apiFullUrl, ids: selectedForDropPermanently })(),
				order: 2,
				variant: 'contained',
				color: 'primary',
			},
			create: {
				text: 'Create',
				to: 'accesses/0',
				order: 3,
				variant: 'contained',
				color: 'secondary',
			},
		},
		filters: {
			isDeleted: true,
			isNotDeleted: true,
		},
		rowColumns: [{
			name: 'ID',
			id: 'id',
			sortable: true,
			order: 0,
		}, {
			name: 'Main',
			id: 'main',
			order: 1,
		}, {
			name: 'Status',
			id: 'status',
			order: 2,
		}, {
			name: 'User',
			id: 'user',
			order: 3,
		}, {
			name: 'Story',
			id: 'story',
			sortable: true,
			order: 5,
		}],
	},

	form: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Access',

		pageUrl: 'accesses/:id',
		pageTitle: 'Access',

		id: 'data-type-accesses-form',
		storeName: 'data-type-accesses-form',
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
				id: 'data-type-type-option-relations-list',
				storeName: 'data-type-type-option-relations-list',
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
					id: 'data-type-type-option-relations-form',
					storeName: 'data-type-type-option-relations-form',
					apiUrl: 'access/:id/role',

					title: 'Role',

					post: {
						apiUrl: 'access/:id/roles',
					},

					fields: [{
						Component: Select,
						storeName: 'data-type-type-option-relations-form',
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
	},

	options: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Options',

		pageUrl: 'accesses/options',
		pageTitle: 'Options',

		fieldsBlock: true,
		fieldsBlockTitle: 'Options:',

		list: {
			id: 'data-type-accesses-options-list',
			storeName: 'data-type-accesses-options-list',
			apiUrl: 'access-option',
			initialPage: 1,
			initialLimit: 20,
			search: true,
			bulkDeletion: true,
			withContextMenu: true,
			withFilter: true,

			entity: 'accessId', 
			entityRelation: 'accessOptionId',
			entityOptionRelation: 'accessAccessOptionId',
			relation: 'accessAccessOptions', 
			relationContent: 'accessAccessAccessOptions',

			manage: {
				drop: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Disable checked (${selectedForDrop.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('disable-many', { ids: selectedForDrop })(),
					order: 0,
					variant: 'contained',
					color: 'error',
				},
				dropPermanently: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDropPermanently.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDropPermanently })(),
					order: 1,
					variant: 'contained',
					color: 'error',
				},
				restore: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Restore (${selectedForDropPermanently.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently, context) => actionApiFormRestore(context.storeName, { apiUrl: context.apiFullUrl, ids: selectedForDropPermanently })(),
					order: 2,
					variant: 'contained',
					color: 'primary',
				},
				create: {
					text: 'Create',
					to: 'accesses/options/0',
					order: 3,
					variant: 'contained',
					color: 'secondary',
				},
			},
			filters: {
				isDeleted: true,
				isNotDeleted: true,
			},

			rowColumns: [{
				name: 'ID',
				id: 'id',
				sortable: true,
				order: 0,
			}, {
				name: 'Main',
				id: 'main',
				order: 1,
			}, {
				name: 'Data type',
				id: 'dataType',
				order: 2,
			}, {
				name: 'Props',
				id: 'props',
				order: 3,
			}, {
				name: 'Story',
				id: 'story',
				sortable: true,
				order: 5,
			}],
		},

		form: {
			displayInBreadcrumbsMenu: true,
			breadcrumbsMenuTitle: 'Option',

			pageUrl: 'accesses/options/:id',
			pageTitle: 'Option',

			id: 'data-type-accesses-options-form',
			storeName: 'data-type-accesses-options-form',
			apiUrl: 'access-option',
			apiRelationUrl: 'access/option/:id',

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
				list: {
					id: 'data-type-accesses-option-relations-list',
					storeName: 'data-type-accesses-option-relations-list',
					columnName: 'accessId',
					apiMainModelUrl: `${process.env.URL_API_DATA_TYPE}/access`,
					apiUrl: 'access/option',
					initialPage: 1,
					initialLimit: 20,
					bulkDeletion: true,
					withForceDropMenu: true,

					listTitle: 'Related data',
					listSubtitle: 'Intermediate data between the main model and current option.',

					manage: {
						drop: {
							text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Disable checked (${selectedForDrop.length})`,
							showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
							onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('disable-many', { ids: selectedForDrop })(),
							order: 0,
							variant: 'contained',
							color: 'error',
						},
						dropPermanently: {
							text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDropPermanently.length})`,
							showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
							onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDropPermanently })(),
							order: 1,
							variant: 'contained',
							color: 'error',
						},
						restore: {
							text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Restore (${selectedForDropPermanently.length})`,
							showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
							onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently, context) => actionApiFormRestore(context.storeName, { apiUrl: context.apiFullUrl, ids: selectedForDropPermanently })(),
							order: 2,
							variant: 'contained',
							color: 'primary',
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
						name: 'Access',
						id: 'accessId',
						order: 1,
					}, {
						name: 'Story',
						id: 'story',
						order: 2,
					}],

					form: {
						id: 'data-type-accesses-option-relations-form',
						storeName: 'data-type-accesses-option-relations-form',
						apiUrl: 'access/:id/option',

						title: 'Access',

						post: {
							apiUrl: 'access/:id/options',
						},

						fields: [{
							Component: Select,
							storeName: 'data-type-accesses-option-relations-form',
							apiUrl: 'access',
							name: 'accessId',
							itemKey: 'name',
							label: 'Select',
							required: true,
							filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
							check: [ utilsCheckStrId ]
						}],
					},
				},
			},
		},
	},

	statuses: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Statuses',

		pageUrl: 'accesses/statuses',
		pageTitle: 'Options',

		list: {
			id: 'data-type-accesses-statuses-list',
			storeName: 'data-type-accesses-statuses-list',
			apiUrl: 'access-status',
			initialPage: 1,
			initialLimit: 20,
			bulkDeletion: true,
			search: true,
			withContextMenu: true,
			withFilter: true,

			manage: {
				drop: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Disable checked (${selectedForDrop.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('disable-many', { ids: selectedForDrop })(),
					order: 0,
					variant: 'contained',
					color: 'error',
				},
				dropPermanently: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDropPermanently.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDropPermanently })(),
					order: 1,
					variant: 'contained',
					color: 'error',
				},
				restore: {
					text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Restore (${selectedForDropPermanently.length})`,
					showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
					onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently, context) => actionApiFormRestore(context.storeName, { apiUrl: context.apiFullUrl, ids: selectedForDropPermanently })(),
					order: 2,
					variant: 'contained',
					color: 'primary',
				},
				create: {
					text: 'Create',
					to: 'accesses/statuses/0',
					order: 3,
					variant: 'contained',
					color: 'secondary',
				},
			},
			filters: {
				isDeleted: true,
				isNotDeleted: true,
			},

			rowColumns: [{
				name: 'ID',
				id: 'id',
				sortable: true,
				order: 0,
			}, {
				name: 'Main',
				id: 'main',
				order: 1,
			}, {
				name: 'User',
				id: 'user',
				order: 2,
			}, {
				name: 'Story',
				id: 'story',
				sortable: true,
				order: 5,
			}],
		},

		form: {
			displayInBreadcrumbsMenu: true,
			breadcrumbsMenuTitle: 'Status',

			pageUrl: 'accesses/statuses/:id',
			pageTitle: 'Status',

			id: 'data-type-accesses-statuses-form',
			storeName: 'data-type-accesses-statuses-form',
			apiUrl: 'access-status',

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
		},
	},
};

export default config;
