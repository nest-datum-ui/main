import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Store from '@nest-datum-ui/components/Store';

const onSetDefault = async ({
	storeName,
	entityId,
	pathEntity,
	pathEntityUpperCase,
}) => {
	const listData = [ ...Store()
		.getState()['api']
		.list[storeName]
		.data ];

	const newListData = listData.map(({
		[`${pathEntity}${pathEntityUpperCase}Options`]: entityEntityOptions,
		...optionData
	}) => {
		const values = [];

		entityEntityOptions.forEach(({
			[`${pathEntity}${pathEntityUpperCase}${pathEntityUpperCase}Options`]: entityEntityEntityOptions,
			...referenceData
		}) => {
			entityEntityEntityOptions.forEach(({
				content,
				...value
			}) => {
				let contentProcessed = content ?? (optionData['defaultValue'] || '');

				if (optionData['dataTypeId'] === 'data-type-type-file') {
					try {
						const contentFromJson = JSON.parse(contentProcessed);

						contentProcessed = contentFromJson;
					}
					catch (err) {
					}
				}
				values.push({
					...value,
					entityOptionId: entityEntityOptions[0]['id'],
					entityId,
					content: contentProcessed,
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
