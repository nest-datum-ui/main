import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListPush = (storeName, value) => (prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't clear api store list. Store list name "${storeName}" is not valid.`);
	}
	return storeDispatch(prefix, prefix +'.listPush', { payload: { storeName, value } });
};

export const reducerListPush = (state, action) => {
	return {
		...state,
		list: {
			...state.list,
			[action.payload.storeName]: {
				...(state.list[action.payload.storeName] || {}),
				data: [
					...((state.list[action.payload.storeName] || {})['data'] || []),
					action.payload.value,
				],
			}
		}
	};
};
