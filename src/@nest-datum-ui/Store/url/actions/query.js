import { fireListProp } from '../../api/actions/list/prop.js';
import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireQuery = async (storeName, newQuery, search) => {
	await fireListProp(storeName, 'loader', true)();

	const currentQuery = hookProperty('query', search || window.location.search) || '';

	if (newQuery !== currentQuery) {
		return fireUpdate('query', ((newQuery || '').length > 0) ? newQuery : undefined, search);
	}
};
