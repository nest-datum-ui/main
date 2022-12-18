import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Store from '@nest-datum-ui/components/Store';

const onSetDefault = async ({
	storeName,
	entityId,
	entityName,
	entityNameUpperCase,
}) => {
	const listValuesData = [ ...(Store()
		.getState()['api']
		.list[`${storeName}Values`] || {})
		.data || [] ];
	const listOptionsData = [ ...Store()
		.getState()['api']
		.list[storeName]
		.data ];
	const prepereListData = {};
	const newListData = [];

	listOptionsData.forEach((optionData) => {
		listValuesData.forEach((entity) => {
			entity[`${entityName}${entityNameUpperCase}Options`].forEach((item) => {
				if (item[`${entityName}OptionId`] === optionData['id']) {
					if (!prepereListData[item[`${entityName}OptionId`]]) {
						prepereListData[item[`${entityName}OptionId`]] = [];
					}
					prepereListData[item[`${entityName}OptionId`]].push({ ...item });
				}
			});
		});
	});

	listOptionsData.forEach((optionData) => {
		let value = {
			parentId: '',
			content: '',
		};

		newListData.push({
			...optionData,
			values: Array.isArray(prepereListData[optionData['id']])
				&& prepereListData[optionData['id']].length > 0
				? prepereListData[optionData['id']].map(({
					parentId,
					isDeleted,
					id,
					content,
					[`${entityName}OptionId`]: entityOptionId,
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
					return ({
						parentId,
						entityOptionId: optionData['id'],
						entityId,
						content: contentProcessed,
						isDeleted,
						id,
					});
				})
				: (() => {
					let contentProcessed = value['content'] ?? (optionData['defaultValue'] || '');

					if (optionData['dataTypeId'] === 'data-type-type-file') {
						try {
							const contentFromJson = JSON.parse(contentProcessed);

							contentProcessed = contentFromJson;
						}
						catch (err) {
						}
					}
					return [{
						parentId: value['parentId'],
						entityOptionId: optionData['id'],
						entityId,
						content: contentProcessed,
						isDeleted: false,
						id: Date.now(),
					}]
				})(),
		});
	});

	await actionApiListProp(storeName, 'data', [ ...newListData ])();
	await actionApiListProp(storeName, 'optionsReady', true)();
};

export default onSetDefault;
