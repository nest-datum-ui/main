import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Store from '@nest-datum-ui/components/Store';

const onSetExists = async ({
	storeName,
	entityId,
}) => {
	const optionsListData = [ ...Store()
		.getState()['api']
		.list[storeName]
		.data || [] ];
	const valuesListData = [ ...(Store()
		.getState()['api']
		.list[`${storeName}Values`]
		.data || []) ];

	optionsListData.forEach((option) => {
		let values = [];

		valuesListData
			.forEach((value) => {
				let entityName = '';

				Object
					.keys(value || {})
					.find((key) => {
						const keySplit = key.split('Options');

						if (keySplit.length === 2
							&& keySplit[keySplit.length - 1] === '') {
							return (entityName = keySplit[0]);
						}
						return false;
					});

				const entityNameSplit = (entityName || '').split(/(?=[A-Z])/);
				const options = (value[`${entityName}Options`] || [])
					.filter((value) => option['id'] === value[`${entityNameSplit[0]}OptionId`])
					.map((value) => ({
						entityId: value[`${entityNameSplit[0]}Id`],
						entityOptionId: value[`${entityNameSplit[0]}OptionId`],
						parentId: value['parentId'],
						id: value['id'],
						content: value['content'],
						isDeleted: value['isDeleted'],
					}));

				if (options.length > 0) {
					values = [ ...values, ...options ]; 
				}
			});

		option['values'] = (Array.isArray(values)
			&& values.length > 0)
			? values
			: [{
				parentId: '',
				entityOptionId: option.id,
				entityId: entityId,
				content: option.defaultValue,
				isDeleted: false,
				id: Date.now(),
			}];
	});

	await actionApiListProp(storeName, 'data', [ ...optionsListData ])();
	await actionApiListProp(storeName, 'optionsReady', true)();
};

export default onSetExists;
