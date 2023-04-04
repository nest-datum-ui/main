import { storeDispatch } from '../../Store.js';
import { reducerUpdate as mainReducerUpdate } from '../../main/actions/update.js';

export const fireOpen = (id, data = {}) => async (prefix = 'dialog') => await storeDispatch(prefix, prefix +'.open', { 
	payload: { 
		id,
		data,
	}, 
});

export const reducerOpen = (state, action) => {
	return ({ 
		...mainReducerUpdate(state, action), 
		[action.payload.id]: action.payload.data,
	});
};
