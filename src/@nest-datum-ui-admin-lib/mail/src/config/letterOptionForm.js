
const letterOptionForm = {
	parentName: 'mailLetterOption',
	relationListName: 'mailLetterOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'letters/options/:id',
	pageTitle: 'Option',

	id: 'mail-letter-options-form',
	storeName: 'mail-letter-options-form',
	apiUrl: 'letter-option',
	apiRelationUrl: 'letter/option/:id',

	entity: 'letterId', 
	entityRelation: 'letterOptionId',
	entityOptionRelation: 'letterLetterOptionId',
	relation: 'letterLetterOptions', 
	relationContent: 'letterLetterLetterOptions',

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

export default letterOptionForm;
