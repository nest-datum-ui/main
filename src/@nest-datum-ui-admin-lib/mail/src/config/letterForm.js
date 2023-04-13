
const letterForm = {
	parentName: 'mailLetter',
	optionName: 'mailLetterOption',
	optionListName: 'mailLetterOptionList',
	optionFormName: 'mailLetterOptionForm',
	statusName: 'mailLetterStatus',
	statusListName: 'mailLetterStatusList',
	relationListName: 'mailLetterFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Letter',

	pageUrl: 'letters/:id',
	pageTitle: 'Letter',

	id: 'mail-letter-form',
	storeName: 'mail-letter-form',
	apiUrl: 'letter',

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

export default letterForm;
