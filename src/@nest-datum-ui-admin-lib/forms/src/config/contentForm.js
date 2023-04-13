
const contentForm = {
	parentName: 'formsContent',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'content',

	pageUrl: 'contents/:id',
	pageTitle: 'Content',

	id: 'forms-content-form',
	storeName: 'forms-content-form',
	apiUrl: 'content',

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

export default contentForm;
