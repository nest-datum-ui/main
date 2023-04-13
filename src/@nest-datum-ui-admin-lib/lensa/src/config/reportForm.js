
const reportForm = {
	parentName: 'lensaReport',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'report',

	pageUrl: 'reports/:id',
	pageTitle: 'Report',

	id: 'lensa-report-form',
	storeName: 'lensa-report-form',
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
