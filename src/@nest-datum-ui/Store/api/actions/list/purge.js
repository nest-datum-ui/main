import { str as utilsCheckStr } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListPurge = (storeName) => (prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't clear api store list. Store list name "${storeName}" is not valid.`);
	}
	return storeDispatch(prefix, prefix +'.listPurge', { payload: { storeName } });
};

export const reducerListPurge = (state, action) => {
	if (state.list[action.payload.storeName]) {
		delete state.list[action.payload.storeName];
	}
	return {
		...state,
		list: {
			...state.list,
		},
	};
};
