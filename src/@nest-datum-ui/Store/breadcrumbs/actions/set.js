import {
	obj as utilsCheckObj,
	arr as utilsCheckArr,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireSet = (id, data, start, end) => async (prefix = 'breadcrumbs') => await storeDispatch(prefix, prefix +'.set', { 
	payload: { 
		id, 
		data,
		start,
		end,
	}, 
});

export const reducerSet = (state, action) => {
	if (!utilsCheckObj(state[action.payload.id])) {
		state[action.payload.id] = {};
	}
	if (!utilsCheckArr(state[action.payload.id].data)) {
		state[action.payload.id]['data'] = [];
	}
	state[action.payload.id]['prev'] = state[action.payload.id].data[state[action.payload.id].data.length - 1];
	let start = 0,
		end = state[action.payload.id].data.length - 1,
		withIndexFlag = false;

	if (utilsCheckNumericInt(action.payload.start)) {
		withIndexFlag = true;
		start = action.payload.start;
	}
	if (utilsCheckNumericInt(action.payload.end)) {
		withIndexFlag = true;
		end = action.payload.end;
	}
	if (withIndexFlag) {
		const data = [ ...state[action.payload.id].data ];
		let i = start,
			ii = 0;

		data.splice(start, end);

		while (i < (end + 1)) {
			if (!action.payload.data[ii]) {
				break;
			}
			data.push(action.payload.data[ii]);
			i++;
			ii++;
		}
		if (state[action.payload.id].data.length > end) {
			i = end;

			while (i < state[action.payload.id].data.length) {
				if (state[action.payload.id].data[i]) {
					data.push(state[action.payload.id].data[i]);
				}
				i++;
			}
		}
		state[action.payload.id].data = [ ...data ];
	}
	else {
		state[action.payload.id].data = action.payload.data;
	}
	state[action.payload.id].data = [ ...state[action.payload.id].data ];

	return { ...state };
};
