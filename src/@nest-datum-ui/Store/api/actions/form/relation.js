import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import {
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strUrl as utilsCheckStrUrl,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { getStore } from '../../../Store.js';
import { fireClose } from '../../../dialog/actions/close.js';
import { fireListProp } from '../list/prop.js';
import { fireFormProp } from './prop.js';
import { fireFormCreate } from './create.js';
import { fireFormClear } from './clear.js';

export const fireFormRelation = async (storeName, options = {}) => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't create api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (!utilsCheckStrUrl(options.apiUrl)) {
		throw new Error(`Can't get api store form. Property apiUrl "${options.apiUrl}" is not valid.`);
	}
	if (options.fields && !utilsCheckArr(options.fields)) {
		throw new Error(`Can't create api store form. Property storeName "${storeName}" is not valid.`);
	}
	if (utilsCheckStrId(options.entityId)) {
		options.apiUrl = options.apiUrl.replace(':id', options.entityId);
	}
	await fireFormProp(storeName, 'loader', true)();

	let validatedData = true;

	if (options.fields) {
		const validatedProperties = {};

		options.fields.forEach((item) => {
			if (utilsCheckStrId(item['name'])) {
				validatedProperties[item['name']] = {
					text: 'The value is in the wrong format.',
					check: item['check'] || [],
					...item['required']
						? { isRequired: true }
						: {},
				};
			}
		});

		validatedData = await utilsValidateStore(storeName, validatedProperties);
	}
	if (validatedData) {
		await fireFormCreate(storeName, { apiUrl: options.apiUrl })();

		const userId = (getStore().getState().auth || {}).id;
		const formData = ((getStore().getState().api || {}).form || {})[storeName] || {};
		const listData = (((getStore().getState().api || {}).list || {})[options.listStoreName] || {}).data;

		if (utilsCheckArr(listData)) {
			listData.unshift({ 
				...formData,
				userId,
			});

			await fireListProp(options.listStoreName, 'data', [ ...listData ])();
		}
		await fireFormClear(storeName)();
		await fireClose('relation')();
	}
};
