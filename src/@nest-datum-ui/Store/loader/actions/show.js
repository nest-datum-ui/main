import {
	strId as utilsCheckStrId,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireShow = (...properties) => async (callback = () => {}, prefix = 'loader') => await storeDispatch(prefix, prefix +'.show', { 
	payload: { 
		...utilsCheckStrId(properties[0])
			|| utilsCheckNumericInt(properties[0])
			? {
				id: properties[0],
				data: properties[1] || {},
			}
			: {
				id: (properties[0] || {})['id'] || 'window',
				data: properties[0] || {},
			},
		callback,
	}, 
});

export const reducerShow = (state, action) => {
	setTimeout(() => action.payload.callback(state[action.payload.id]), 0);

	return {
		...state,
		[action.payload.id]: {
			...action.payload,
			visible: true,
		},
	};
};
