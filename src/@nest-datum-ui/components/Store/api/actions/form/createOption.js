import { v4 as uuidv4 } from 'uuid';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireFormCreateOption = async (storeFormNameOrUrl, {
	id,
	relationTableName,
	valueTableName,
}) => {
	const data = (((Store()
		.getState()
		.api || {})
		.list || {})[storeFormNameOrUrl] || {})
		.data;

	if (utilsCheckArr(data)) {
		const optionDataIndex = data.findIndex((item) => item.id === id);

		if (utilsCheckArr(data[optionDataIndex][relationTableName])
			&& utilsCheckObj(data[optionDataIndex][relationTableName][0])
			&& utilsCheckArr(data[optionDataIndex][relationTableName][0][valueTableName])) {
			
			if (data[optionDataIndex][relationTableName][0][valueTableName].length === 0) {
				data[optionDataIndex][relationTableName][0][valueTableName].push({
					...data[optionDataIndex][relationTableName][0][valueTableName][0],
					content: '',
					id: uuidv4(),
				});
			}
			data[optionDataIndex][relationTableName][0][valueTableName].push({
				...data[optionDataIndex][relationTableName][0][valueTableName][0],
				content: '',
				id: uuidv4(),
			});
			data[optionDataIndex][relationTableName][0][valueTableName] = [
				...data[optionDataIndex][relationTableName][0][valueTableName],
			];
			data[optionDataIndex][relationTableName][0] = {
				...data[optionDataIndex][relationTableName][0],
			};
			data[optionDataIndex] = { ...data[optionDataIndex] };

			actionApiListProp(storeFormNameOrUrl, 'data', [ ...data ])();
		}
	}
};
