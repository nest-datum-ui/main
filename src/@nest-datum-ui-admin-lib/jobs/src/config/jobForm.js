
const jobForm = {
	parentName: 'jobsJob',
	optionName: 'jobsJobOption',
	optionListName: 'jobsJobOptionList',
	optionFormName: 'jobsJobOptionForm',
	statusName: 'jobsJobStatus',
	statusListName: 'jobsJobStatusList',
	relationListName: 'jobsJobFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'jobs',

	pageUrl: 'jobs/:id',
	pageTitle: 'Job',

	id: 'jobs-job-form',
	storeName: 'jobs-job-form',
	apiUrl: 'job',

	entity: 'jobId', 
	entityRelation: 'jobOptionId',
	entityOptionRelation: 'jobJobOptionId',
	relation: 'jobJobOptions', 
	relationContent: 'jobJobJobOptions',

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

export default jobForm;
