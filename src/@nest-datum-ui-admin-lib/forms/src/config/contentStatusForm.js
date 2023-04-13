
const contentStatusForm = {
	parentName: 'formsContentStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'contents/statuses/:id',
	pageTitle: 'Status',

	id: 'forms-content-statuses-form',
	storeName: 'forms-content-statuses-form',
	apiUrl: 'content-status',

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

export default contentStatusForm;
