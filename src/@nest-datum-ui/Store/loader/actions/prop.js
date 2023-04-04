import {
	strId as utilsCheckStrId,
	numericInt as utilsCheckNumericInt,
} from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireProp = (...properties) => async (prefix = 'loader') => await storeDispatch(prefix, prefix +'.prop', { 
	payload: { 
		...utilsCheckStrId(properties[0])
			|| utilsCheckNumericInt(properties[0])
			? {
				id: properties[0],
				name: properties[1],
				value: properties[2],
			}
			: {
				id: 'window',
				name: properties[0],
				value: properties[1],
			},
	}, 
});

export const reducerProp = (state, action) => {
	return {
		...state,
		[action.payload.id]: {
			...(state[action.payload.id] || {}),
			[action.payload.name]: action.payload.value,
		},
	};
};
