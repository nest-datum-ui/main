import { fireListProp } from '../../api/actions/list/prop.js';
import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireSort = async (storeName, key, newValue, search) => {
	await fireListProp(storeName, 'loader', true)();

	const sort = hookProperty('sort', search || window.location.search, true) || {};

	if (newValue.toLowerCase() === 'desc' || newValue.toLowerCase() === 'asc') {
		sort[key] = newValue;
	}
	else {
		delete sort[key];
	}
	return fireUpdate('sort', sort);
};
