import {
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { getStore } from '../../../Store.js';
import { fireListProp } from '../list/prop.js';

export const fireFormDropOption = async (storeName, {
	id,
	relation,
	relationContent,
	optionIndex,
	optionValueIndex,
	entityRelationId,
}) => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't drop option api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (!utilsCheckNumericInt(optionIndex)) {
		throw new Error(`Can't drop option api store form. Property optionIndex "${optionIndex}" is not valid.`);
	}
	if (!utilsCheckNumericInt(optionValueIndex)) {
		throw new Error(`Can't drop option api store form. Property optionValueIndex "${optionValueIndex}" is not valid.`);
	}
	const data = ((getStore().getState().api.list || {})[storeName] || {}).data;

	if (!utilsCheckArr(data)) {
		throw new Error(`Can't drop option api store form. List data "${data}" is not valid.`);
	}
	const optionData = data.find((item) => item.id === entityRelationId);

	if (!utilsCheckObj(optionData)) {
		throw new Error(`Can't drop option api store form. Property optionData "${optionData}" is not valid.`);
	}
	const optionDataValues = optionData[relation][optionIndex][relationContent];

	optionDataValues.splice(optionValueIndex, 1);
	optionData[relation][optionIndex][relationContent] = [ ...optionDataValues ];

	fireListProp(storeName, 'data', [ ...data ])();
};
