
const reportForm = {
	parentName: 'cvReport',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'report',

	pageUrl: 'reports/:id',
	pageTitle: 'Report',

	id: 'cv-report-form',
	storeName: 'cv-report-form',
	apiUrl: 'report',

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
};

export default reportForm;
