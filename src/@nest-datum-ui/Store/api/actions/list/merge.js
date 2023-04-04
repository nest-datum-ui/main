import{ obj as utilsCheckObj } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListMerge = (storeName, data = {}) => async (prefix = 'api') => await storeDispatch(prefix, prefix +'.listMerge', {
	payload: {
		storeName,
		data,
	},
})

export const reducerListMerge = (state, action) => {
	if (!utilsCheckObj(state.list[action.payload.storeName])) {
		state.list[action.payload.storeName] = {};
	}
	return { 
		...state,
		list: {
			...state.list,
			[action.payload.storeName]: {
				...state.list[action.payload.storeName],
				...action.payload.data,
			},
		}, 
	};
};
