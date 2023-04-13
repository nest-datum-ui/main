
const jobStatusForm = {
	parentName: 'jobsJobStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'jobs/statuses/:id',
	pageTitle: 'Status',

	id: 'jobs-job-statuses-form',
	storeName: 'jobs-job-statuses-form',
	apiUrl: 'job-status',

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

export default jobStatusForm;
