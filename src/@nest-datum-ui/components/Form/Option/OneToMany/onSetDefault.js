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
	const listOptionsData = [ ...(Store()
		.getState()['api']
		.list[storeName]
		.data || []) ];
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
			content: undefined,
		};

		newListData.push({
			...optionData,
			values: (Array.isArray(prepereListData[optionData['id']])
				&& prepereListData[optionData['id']].length > 0)
				? prepereListData[optionData['id']].map(({
					parentId,
					isDeleted,
					id,
					content,
					[`${entityName}OptionId`]: entityOptionId,
				}) => {
					return ({
						parentId,
						entityOptionId: optionData['id'],
						entityId,
						content: content ?? (optionData['defaultValue'] || ''),
						isDeleted,
						id,
					});
				})
				: (() => {
					return [{
						parentId: value['parentId'],
						entityOptionId: optionData['id'],
						entityId,
						content: value['content'] ?? (optionData['defaultValue'] || ''),
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
