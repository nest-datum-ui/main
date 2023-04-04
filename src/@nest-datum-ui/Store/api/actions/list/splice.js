import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListSplice = (storeName, index = 0, count = 1) => (prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't clear api store list. Store list name "${storeName}" is not valid.`);
	}
	return storeDispatch(prefix, prefix +'.listSplice', { payload: { storeName, index, count } });
};

export const reducerListSplice = (state, action) => {
	const data = ((state.list[action.payload.storeName] || {}).data || [])

	data.splice(action.payload.index, action.payload.count);

	return {
		...state,
		list: {
			...state.list,
			[action.payload.storeName]: {
				...(state.list[action.payload.storeName] || {}),
				data: [ ...data ],
			}
		}
	};
};
