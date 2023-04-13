
const fieldStatusForm = {
	parentName: 'formsFieldStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'fields/statuses/:id',
	pageTitle: 'Status',

	id: 'forms-field-statuses-form',
	storeName: 'forms-field-statuses-form',
	apiUrl: 'field-status',

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

export default fieldStatusForm;
