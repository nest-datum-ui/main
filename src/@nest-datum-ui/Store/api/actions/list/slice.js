import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListSlice = (storeName, index = 0, end = 1) => (prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't clear api store list. Store list name "${storeName}" is not valid.`);
	}
	return storeDispatch(prefix, prefix +'.listSlice', { payload: { storeName, index, end } });
};

export const reducerListSlice = (state, action) => {
	const data = ((state.list[action.payload.storeName] || {}).data || []).slice(action.payload.index, action.payload.end);

	return {
		...state,
		list: {
			...state.list,
			[action.payload.storeName]: {
				...(state.list[action.payload.storeName] || {}),
				data,
			}
		}
	};
};
