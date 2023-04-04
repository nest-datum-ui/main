import {
	strId as utilsCheckStrId,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireHide = (...properties) => async (prefix = 'loader') => await storeDispatch(prefix, prefix +'.hide', { 
	payload: { 
		...utilsCheckStrId(properties[0])
			|| utilsCheckNumericInt(properties[0])
			? {
				id: properties[0],
				data: properties[1],
			}
			: {
				id: (properties[0] || {})['id'] || 'window',
				data: properties[0],
			},
	}, 
});

export const reducerHide = (state, action) => {
	return {
		...state,
		[action.payload.id]: {
			...(state[action.payload.id] || {}),
			...action.payload,
			visible: false,
		},
	};
};
