import { v4 as uuidv4 } from 'uuid';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import Store from '@nest-datum-ui/components/Store';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';
import utilsConvertStrEntity from '@nest-datum-ui/utils/convert/str/entity.js';

export const fireFormUpdateOption = async (storeFormNameOrUrl, {
	entityId,
	value,
	id,
	relationTableName,
	valueTableName,
	dataTypeId,
	optionIndex,
	option, 
	optionValueIndex,
	optionValue,
}) => {
	const data = (((Store()
		.getState()
		.api || {})
		.list || {})[storeFormNameOrUrl] || {})
		.data;

	if (utilsCheckNumeric(optionIndex)
		&& utilsCheckNumeric(optionValueIndex)
		&& utilsCheckArr(data)) {
		const entityTableName = utilsConvertStrEntity(relationTableName);

		if (entityTableName) {
			const optionData = data.find((item) => item.id === option[`${entityTableName}OptionId`]);

			if (utilsCheckObj(optionData)) {
				if (!utilsCheckObj(optionData[relationTableName][optionIndex][valueTableName][optionValueIndex])
					|| !optionData[relationTableName][optionIndex][valueTableName][optionValueIndex]['entityId']
					|| !optionData[relationTableName][optionIndex][valueTableName][optionValueIndex]['entityOptionId']) {
					optionData[relationTableName][optionIndex][valueTableName][optionValueIndex] = {
						id: uuidv4(),
						...optionData[relationTableName][optionIndex][valueTableName][optionValueIndex],
						content: value ?? '',
						entityId,
						entityOptionId: optionData[relationTableName][0].id,
					};
				}
				else {
					optionData[relationTableName][optionIndex][valueTableName][optionValueIndex]['content'] = value;
				}
				actionApiListProp(storeFormNameOrUrl, 'data', data)();
			}
		}
	}
};
