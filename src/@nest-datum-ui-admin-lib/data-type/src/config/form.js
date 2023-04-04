
const form = {
	parentName: 'dataType',
	optionName: 'dataTypeOption',
	optionListName: 'dataTypeOptionList',
	optionFormName: 'dataTypeOptionForm',
	statusName: 'dataTypeStatus',
	statusListName: 'dataTypeStatusList',
	relationListName: 'dataTypeFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Type',

	pageUrl: 'types/:id',
	pageTitle: 'Type',

	id: 'data-type-type-form',
	storeName: 'data-type-type-form',
	apiUrl: 'type',

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

export default form;
