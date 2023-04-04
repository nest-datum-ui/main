import {
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireDel = (id, start, count) => async (prefix = 'breadcrumbs') => await storeDispatch(prefix, prefix +'.del', { 
	payload: { 
		id, 
		start,
		count,
	}, 
});

export const reducerDel = (state, action) => {
	if (utilsCheckObj(state[action.payload.id])
		&& utilsCheckArr(state[action.payload.id].data)) {
		state[action.payload.id]['prev'] = state[action.payload.id].data[state[action.payload.id].data.length - 1];

		state[action.payload.id].data = state[action.payload.id]
			.data
			.splice(action.payload.start, action.payload.count);
		state[action.payload.id].data = [ ...state[action.payload.id].data ];
	}
	return { ...state };
};
