import { createRouteContext } from '@nest-datum-ui/Context';

const settingsDataForm = createRouteContext({
	id: 'setting-form',
	storeName: 'setting-form',
	apiUrl: 'setting',

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
});

export default settingsDataForm;
