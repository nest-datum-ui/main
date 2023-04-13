
const letterStatusForm = {
	parentName: 'mailLetterStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'letters/statuses/:id',
	pageTitle: 'Status',

	id: 'mail-letter-statuses-form',
	storeName: 'mail-letter-statuses-form',
	apiUrl: 'letter-status',

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

export default letterStatusForm;
