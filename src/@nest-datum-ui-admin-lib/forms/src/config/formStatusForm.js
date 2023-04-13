
const formStatusForm = {
	parentName: 'formsFormStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'forms/statuses/:id',
	pageTitle: 'Status',

	id: 'forms-form-statuses-form',
	storeName: 'forms-form-statuses-form',
	apiUrl: 'form-status',

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

export default formStatusForm;
