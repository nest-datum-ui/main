
const templateStatusForm = {
	parentName: 'mailTemplateStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'templates/statuses/:id',
	pageTitle: 'Status',

	id: 'mail-template-statuses-form',
	storeName: 'mail-template-statuses-form',
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
