import Store from '@nest-datum-ui/components/Store';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';
import utilsConvertStrEntity from '@nest-datum-ui/utils/convert/str/entity.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';

export const fireFormDropOption = async (storeFormNameOrUrl, {
	id,
	relationTableName,
	valueTableName,
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
		&& optionValueIndex >= 0
		&& utilsCheckArr(data)) {
		const entityTableName = utilsConvertStrEntity(relationTableName);

		if (entityTableName) {
			const optionData = data.find((item) => item.id === option[`${entityTableName}OptionId`]);

			if (utilsCheckObj(optionData)) {
				const optionDataValues = optionData[relationTableName][optionIndex][valueTableName];

				optionDataValues.splice(optionValueIndex, 1);
				optionData[relationTableName][optionIndex][valueTableName] = [ ...optionDataValues ];

				actionApiListProp(storeFormNameOrUrl, 'data', [ ...data ])();
			}
		}
	}
};
