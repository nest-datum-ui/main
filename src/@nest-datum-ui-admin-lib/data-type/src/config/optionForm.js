
const optionForm = {
	parentName: 'dataTypeOption',
	relationListName: 'dataTypeOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'types/options/:id',
	pageTitle: 'Option',

	id: 'data-type-type-options-form',
	storeName: 'data-type-type-options-form',
	apiUrl: 'type-option',
	apiRelationUrl: 'type/option/:id',

	entity: 'typeId', 
	entityRelation: 'typeOptionId',
	entityOptionRelation: 'typeTypeOptionId',
	relation: 'typeTypeOptions', 
	relationContent: 'typeTypeTypeOptions',

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

export default optionForm;
