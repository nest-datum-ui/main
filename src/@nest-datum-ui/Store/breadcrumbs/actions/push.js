import {
	obj as utilsCheckObj,
	arr as utilsCheckArr,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const firePush = (id, data = {}) => async (prefix = 'breadcrumbs') => await storeDispatch(prefix, prefix +'.push', { 
	payload: { 
		id,
		...data,
	}, 
});

export const reducerPush = (state, action) => {
	if (!utilsCheckObj(state[action.payload.id])) {
		state[action.payload.id] = {};
	}
	if (!utilsCheckArr(state[action.payload.id].data)) {
		state[action.payload.id]['data'] = [];
	}
	state[action.payload.id]['prev'] = state[action.payload.id].data[state[action.payload.id].data.length - 1];
	state[action.payload.id].data.push(action.payload);
	state[action.payload.id].data = [ ...state[action.payload.id].data ];

	return { ...state };
};
