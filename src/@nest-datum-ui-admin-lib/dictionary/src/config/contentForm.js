
const contentForm = {
	parentName: 'dictionaryContent',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'content',

	pageUrl: 'contents/:id',
	pageTitle: 'Content',

	id: 'dictionary-content-form',
	storeName: 'dictionary-content-form',
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
