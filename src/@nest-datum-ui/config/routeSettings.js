import { createRouteContext } from '@nest-datum-ui/Context';
import settingsDataForm from './settingsDataForm.js';

const routeSettings = createRouteContext({
	data: {
		pageTitle: 'Settings list',

		displayInHeaderGroupMenu: true,
		orderInHeaderGroupMenu: 9999,

		list: {
			id: 'settings-list',
			storeName: 'settings-list',
			apiUrl: 'setting',

			bulkDeletion: true,
			search: true,
			manage: {
				create: {
					text: 'Create',
					to: 'settings/0',
					order: 0,
					// component: ButtonCreate,
					// onClick,
				},
			},
			filters: {
				visibility: true,
				deletionPossibility: true,
				// CustomComponent,
			},
			pagination: {
				range: [ 5, 10, 20, 50 ],
				displayOnTop: {
					ifLengthOverLimit: true,
				},
			},
			contextMenu: {
				edit: true,
				copy: true,
				dropOnRemovable: true,
			},
			rowColumns: [{
				name: 'ID',
				id: 'id',
				width: '20%',
				sort: true,
				order: 0,
			}, {
				name: 'Main',
				id: 'main',
				width: '20%',
				order: 1,
			}, {
				name: 'Data type',
				id: 'dataType',
				width: '20%',
				order: 2,
				// component: DataTypeTypographyType,
			}, {
				name: 'Value',
				id: 'value',
				width: '20%',
				order: 3,
			}, {
				name: 'Story',
				id: 'createdAt',
				width: '20%',
				sort: true,
				order: 4,
			}],
		},

		routes: {
			pageTitle: 'Edit seeting',

			form: settingsDataForm,
		},
	},
});

export default routeSettings;
