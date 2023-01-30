import Store from '@nest-datum-ui/components/Store';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';
import utilsConvertStrEntity from '@nest-datum-ui/utils/convert/str/entity.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireFormUpdateOption = async (storeFormNameOrUrl, {
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
				const optionDataValue = optionData[relationTableName][optionIndex][valueTableName][optionValueIndex];

				if (utilsCheckObj(optionDataValue)) {
					optionDataValue.content = value;

					actionApiListProp(storeFormNameOrUrl, 'data', [ ...data ])();
				}
			}
		}
	}
};
