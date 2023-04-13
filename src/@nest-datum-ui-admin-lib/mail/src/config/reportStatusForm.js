
const reportStatusForm = {
	parentName: 'mailReportStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'reports/statuses/:id',
	pageTitle: 'Status',

	id: 'mail-report-statuses-form',
	storeName: 'mail-report-statuses-form',
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
