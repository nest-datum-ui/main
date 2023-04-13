
const reportStatusForm = {
	parentName: 'cvReportStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'reports/statuses/:id',
	pageTitle: 'Status',

	id: 'cv-report-statuses-form',
	storeName: 'cv-report-statuses-form',
	apiUrl: 'report-status',

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

export default reportStatusForm;
