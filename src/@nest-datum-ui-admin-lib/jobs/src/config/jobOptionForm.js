
const jobOptionForm = {
	parentName: 'jobsJobOption',
	relationListName: 'jobsJobOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'jobs/options/:id',
	pageTitle: 'Option',

	id: 'jobs-job-options-form',
	storeName: 'jobs-job-options-form',
	apiUrl: 'job-option',
	apiRelationUrl: 'job/option/:id',

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

export default jobOptionForm;
