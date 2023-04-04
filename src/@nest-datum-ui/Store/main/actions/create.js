import { obj as utilsCheckObj } from '@nest-datum-utils/check';
import { storeDispatch } from '../../Store.js';

export const fireCreate = (payload) => async (prefix = 'main') => {
	if (!utilsCheckObj(payload)) {
		throw new Error('Creating payload is not object type.');
	}
	return storeDispatch(prefix, prefix +'.create', payload);
};

export const reducerCreate = (state, action) => {
	return {
		...action.payload,
		storeName: action.prefix,
		storeCreatedAt: new Date(),
		storeUpdatedAt: new Date(),
	};
};
