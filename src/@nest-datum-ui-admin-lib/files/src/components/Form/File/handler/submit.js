import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import Store, { 
	actionApiFormUpdate, 
	actionDialogClose,
	actionApiListProp,
} from '@nest-datum-ui/Store';
import {
	strId as utilsCheckStrId,
	strIdExists as utilsCheckStrIdExists,
	strName as utilsCheckStrName,
	strDescription as utilsCheckStrDescription,
	strPath as utilsCheckStrPath,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';

const submit = async (e, storeName, apiUrl, entityId) => {
	const validatedData = await utilsValidateStore(storeName, {
		id: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
		},
		systemId: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrId ],
			isRequired: true,
		},
		path: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrPath ],
			isRequired: true,
		},
		name: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrName ],
			isRequired: true,
		},
		description: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckStrDescription ]
		},
		isNotDelete: {
			text: 'The value is in the wrong format.',
			check: [ utilsCheckBool ]
		},
	});

	if (validatedData && utilsCheckStrIdExists(entityId)) {
		actionApiFormUpdate(storeName, { apiUrl, entityId })(() => {
			const data = (Store()
				.getState()
				.api
				.list[storeName] || {})
				.data || [];

			actionApiListProp(storeName, 'data', [
				...data.map((item) => {
					if (item['id'] === entityId) {
						const output = {
							...item,
							...validatedData,
						};
						const pathSplit = output['path'].split('/');

						pathSplit[pathSplit.length - 1] = output['name'];
						output['path'] = pathSplit.join('/');

						return output;
					}
					return item;
				}),
			])();
		});
		actionDialogClose()();
	}
};

export default submit;
