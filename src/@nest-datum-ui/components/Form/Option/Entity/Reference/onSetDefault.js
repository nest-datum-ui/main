import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Store from '@nest-datum-ui/components/Store';

const onSetDefault = async ({
	storeName,
	entityId,
}) => {
	const location = window.location.pathname;
	const entityName = (location.split('/'))[2];
	const entityNameUpperCase = entityName.charAt(0).toUpperCase() + entityName.slice(1);

	const listData = [ ...Store()
		.getState()['api']
		.list[storeName]
		.data ];

	const newListData = listData.map(({
		[`${entityName}${entityNameUpperCase}Options`]: entityEntityOptions,
		...optionData
	}) => {
		const values = [];

		entityEntityOptions.forEach(({
			[`${entityName}${entityNameUpperCase}${entityNameUpperCase}Options`]: entityEntityEntityOptions,
			...referenceData
		}) => {
			entityEntityEntityOptions.forEach(({
				content,
				...value
			}) => {
				values.push({
					...value,
					entityOptionId: entityEntityOptions[0]['id'],
					entityId,
					content: content ?? (optionData['defaultValue'] || ''),
				});
			});
		});

		if (values.length === 0) {
			values.push({
				parentId: '',
				entityOptionId: entityEntityOptions[0]['id'],
				entityId,
				content: optionData['defaultValue'] || '',
				isDeleted: false,
				id: Date.now(),
			});
		}
		optionData['values'] = values;

		return { ...optionData };
	});
	await actionApiListProp(storeName, 'data', [ ...newListData ])();
	await actionApiListProp(storeName, 'optionsReady', true)();
};

export default onSetDefault;
