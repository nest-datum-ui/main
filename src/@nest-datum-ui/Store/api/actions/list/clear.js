import {
	str as utilsCheckStr,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';
import { reducerUpdate as mainReducerUpdate } from '../../../main/actions/update.js';

export const fireListClear = (storeName, defautPayload = {}) => (prefix = 'api') => {
	if (!utilsCheckStr(storeName)) {
		throw new Error(`Can't clear api store list. Store list name "${storeName}" is not valid.`);
	}
	if (!utilsCheckObj(defautPayload)) {
		throw new Error(`Can't clear api store list. Property defautPayload "${defautPayload}" is not valid.`);
	}
	return storeDispatch(prefix, prefix +'.listClear', { payload: { storeName, defautPayload } });
};

export const reducerListClear = (state, action) => {
	return mainReducerUpdate(state, {
		payload: {
			list: {
				...state.list,
				[action.payload.storeName]: {
					selected: [],
					relations: {},
					filter: {},
					sort: {},
					errors: {},
					loader: false,
					page: 1,
					limit: 20,
					total: 0,
					query: '',
					data: null,
					...action.payload.defautPayload,
				},
			},
		},
	});
};
