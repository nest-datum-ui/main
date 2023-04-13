
const templateStatusForm = {
	parentName: 'dictionaryTemplateStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'templates/statuses/:id',
	pageTitle: 'Status',

	id: 'dictionary-template-statuses-form',
	storeName: 'dictionary-template-statuses-form',
	apiUrl: 'template-status',

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

export default templateStatusForm;
