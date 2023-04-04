import axios from 'axios';
import {
	str as utilsCheckStr,
	strUrl as utilsCheckStrUrl,
	strId as utilsCheckStrId,
	strFilled as utilsCheckStrFilled,
	obj as utilsCheckObj,
	arr as utilsCheckArr,
	arrFilled as utilsCheckArrFilled,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { urlApiStr as utilsFormatUrlApiStr } from '@nest-datum-utils/format';
import { getStore } from '../../../Store.js';

export const fireFormCreateOptions = (storeName, options = {}) => async (prefix = 'api') => {
	if (!utilsCheckStrId(options.entityId)) {
		throw new Error(`Can't create options api store form. Property entityId "${options.entityId}" is not valid.`);
	}
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't create options api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (!utilsCheckStrUrl(options.apiUrl)) {
		throw new Error(`Can't create options api store form. Property apiUrl "${options.apiUrl}" is not valid.`);
	}
	try {
		const { form, list } = getStore().getState().api;
		const storeNameArr = [ storeName ];

		if (utilsCheckStrFilled(options.formStoreName) && utilsCheckArrFilled(options.parentIds)) {
			options.parentIds.forEach((id) => storeNameArr.push(id));
		}
		let i = 0;

		while (i < storeNameArr.length) {
			const data = (list[(i === 0) ? storeName : `${storeName}_${storeNameArr[i]}`] || {}).data;

			if (utilsCheckArrFilled(data)) {
				let ii = 0,
					iii = 0,
					payload = [],
					relation,
					relationValue;

				while (ii < data.length) {
					const collector = [];
					const dataItem = data[ii];

					if (!relation
						|| !utilsCheckStr(relation)) {
						relation = Object
							.keys(dataItem)
							.find((key) => {
								const keySplit = key.split('Options');

								return utilsCheckArr(dataItem[key])
									&& keySplit.length >= 2
									&& keySplit[keySplit.length - 1] === '';
							});
					}
					if (!relation
						|| !utilsCheckStr(relation) 
						|| !utilsCheckArr(dataItem[relation])
						|| !utilsCheckObj(dataItem[relation][0])) {
						break;
					}
					const dataItemRelation = dataItem[relation][0];

					if (!relationValue
						|| !utilsCheckStr(relationValue)) {
						relationValue = Object
							.keys(dataItemRelation)
							.find((key) => {
								const keySplit = key.split('Options');

								return utilsCheckArr(dataItemRelation[key])
									&& keySplit.length >= 2
									&& keySplit[keySplit.length - 1] === '';
							});
					}
					if (!relationValue
						|| !utilsCheckStr(relationValue) 
						|| !utilsCheckArr(dataItemRelation[relationValue])) {
						break;
					}
					if (data[ii].dataTypeId === process.env.DATA_TYPE_FILES_UPLOAD) {
					}
					else {
						iii = 0;

						while (iii < dataItemRelation[relationValue].length) {
							const dataItemValue = dataItemRelation[relationValue][iii];
							let entityOptionId,
								entityId;

							if (dataItemValue[options.entityOptionRelation]
								&& dataItemValue[options.entity]) {
								entityOptionId = dataItemValue[options.entityOptionRelation];
								entityId = dataItemValue[options.entity];
							}
							else {
								const entityOptionKey = Object
									.keys(dataItemValue)
									.find((key) => key.indexOf('OptionId') > 3);
								const entityKey = (entityOptionKey.split(/(?=[A-Z])/))[0];
								
								entityOptionId = dataItemValue[entityOptionKey];
								entityId = dataItemValue[`${entityKey}Id`];
							}
							dataItemValue['content'] = ((form[entityOptionId] || {})[dataItemValue.id] ?? dataItemValue['content']) || (form[options.formStoreName] || {})[dataItemValue.id];

							collector.push({
								entityOptionId,
								entityId,
								content: dataItemValue.content,
								id: dataItemValue.id,
								...(storeNameArr[i] !== storeName)
									? { parentId: options.entityId, withNewId: true }
									: {},
							});
							iii++;
						}
						payload.push(collector);
					}
					ii++;
				}
				if (payload.length > 0) {
					await axios.post(utilsFormatUrlApiStr(options.apiUrl), payload);
				}
			}
			i++;
		}
	}
	catch (err) {
		throw new Error(utilsFormatHttpErrorMessage(err, options.apiUrl));
	}
};
