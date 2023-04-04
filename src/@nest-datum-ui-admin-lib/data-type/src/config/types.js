import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { 
	actionDialogOpen,
	actionApiFormRestore, 
} from '@nest-datum-ui/Store';
import Select from 'components/Select';

const config = {
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Data types',

	displayInHeaderTabMenu: true,
	orderInHeaderTabMenu: 0,
	headerTabMenuTitle: 'Data types',

	pageUrl: 'types',
	pageTitle: 'Data types',

	list: {
		id: 'data-type-types-list',
		storeName: 'data-type-types-list',
		apiUrl: 'type',
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
				to: 'types/0',
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
		breadcrumbsMenuTitle: 'Type',

		pageUrl: 'types/:id',
		pageTitle: 'Type',

		id: 'data-type-type-form',
		storeName: 'data-type-type-form',
		apiUrl: 'type',

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

	options: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Options',

		pageUrl: 'types/options',
		pageTitle: 'Options',

		fieldsBlock: true,
		fieldsBlockTitle: 'Options:',

		list: {
			id: 'data-type-type-options-list',
			storeName: 'data-type-type-options-list',
			apiUrl: 'type-option',
			initialPage: 1,
			initialLimit: 20,
			search: true,
			bulkDeletion: true,
			withContextMenu: true,
			withFilter: true,

			entity: 'typeId', 
			entityRelation: 'typeOptionId',
			entityOptionRelation: 'typeTypeOptionId',
			relation: 'typeTypeOptions', 
			relationContent: 'typeTypeTypeOptions',

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
					to: 'types/options/0',
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

			pageUrl: 'types/options/:id',
			pageTitle: 'Option',

			id: 'data-type-type-options-form',
			storeName: 'data-type-type-options-form',
			apiUrl: 'type-option',
			apiRelationUrl: 'type/option/:id',

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
				title: 'Related data',
				subtitle: 'Intermediate data between the main model and current option.',

				list: {
					id: 'data-type-type-option-relations-list',
					storeName: 'data-type-type-option-relations-list',
					columnName: 'typeId',
					apiMainModelUrl: `${process.env.URL_API_DATA_TYPE}/type`,
					apiUrl: 'type/option',
					initialPage: 1,
					initialLimit: 20,
					bulkDeletion: true,
					withForceDropMenu: true,

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
						name: 'Type',
						id: 'typeId',
						order: 1,
					}, {
						name: 'Story',
						id: 'story',
						order: 2,
					}],

					form: {
						id: 'data-type-type-option-relations-form',
						storeName: 'data-type-type-option-relations-form',
						apiUrl: 'type/:id/option',

						title: 'Data type',

						post: {
							apiUrl: 'type/:id/options',
						},

						fields: [{
							Component: Select,
							storeName: 'data-type-type-option-relations-form',
							apiUrl: 'type',
							name: 'typeId',
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

		pageUrl: 'types/statuses',
		pageTitle: 'Options',

		list: {
			id: 'data-type-type-statuses-list',
			storeName: 'data-type-type-statuses-list',
			apiUrl: 'type-status',
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
					to: 'types/statuses/0',
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

			pageUrl: 'types/statuses/:id',
			pageTitle: 'Status',

			id: 'data-type-type-statuses-form',
			storeName: 'data-type-type-statuses-form',
			apiUrl: 'type-status',

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
