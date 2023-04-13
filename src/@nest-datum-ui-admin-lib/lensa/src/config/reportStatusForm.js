
const reportStatusForm = {
	parentName: 'lensaReportStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'reports/statuses/:id',
	pageTitle: 'Status',

	id: 'lensa-report-statuses-form',
	storeName: 'lensa-report-statuses-form',
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
