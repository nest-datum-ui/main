
const contentStatusForm = {
	parentName: 'dictionaryContentStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'contents/statuses/:id',
	pageTitle: 'Status',

	id: 'dictionary-content-statuses-form',
	storeName: 'dictionary-content-statuses-form',
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
