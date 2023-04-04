import { v4 as uuidv4 } from 'uuid';
import { entityNameByRelation as utilsFormatEntityNameByRelation } from '@nest-datum-utils/format';
import {
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { getStore } from '../../../Store.js';
import { fireListProp } from '../list/prop.js';

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
	const data = (((getStore()
		.getState()
		.api || {})
		.list || {})[storeFormNameOrUrl] || {})
		.data;

	if (!utilsCheckNumericInt(optionIndex)) {
		throw new Error(`Can't update option api store form. Property optionIndex "${optionIndex}" is not valid.`);
	}
	if (!utilsCheckNumericInt(optionValueIndex)) {
		throw new Error(`Can't update option api store form. Property optionValueIndex "${optionValueIndex}" is not valid.`);
	}
	if (!utilsCheckArr(data)) {
		throw new Error(`Can't update option api store form. List data "${data}" is not valid.`);
	}
	const entityTableName = utilsFormatEntityNameByRelation(relationTableName);

	if (utilsCheckStr(entityTableName)) {
		throw new Error(`Can't update option api store form. Property entityTableName "${entityTableName}" is not valid.`);
	}
	const optionData = data.find((item) => item.id === option[`${entityTableName}OptionId`]);

	if (!utilsCheckObj(optionData)) {
		throw new Error(`Can't update option api store form. Property optionData "${optionData}" is not valid.`);
	}
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
	fireListProp(storeFormNameOrUrl, 'data', data)();
};
