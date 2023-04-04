import { storeDispatch } from '../../Store.js';
import { reducerUpdate as mainReducerUpdate } from '../../main/actions/update.js';

export const fireOpen = (id, acnhorNode, data) => async (prefix = 'menu') => await storeDispatch(prefix, prefix +'.open', { 
	payload: {
		id,
		acnhorNode,
		data,
	},
});

export const reducerOpen = (state, action) => {
	return ({ 
		...mainReducerUpdate(state, action),
		[action.payload.id]: {
			node: action.payload.acnhorNode,
			data: action.payload.data,
		},
	});
};
