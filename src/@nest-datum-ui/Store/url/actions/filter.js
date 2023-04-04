import { fireListProp } from '../../api/actions/list/prop.js';
import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireFilter = async (storeName, key, value, options = {}, search) => {
	await fireListProp(storeName, 'loader', true)();

	const valueProcessed = value ? (((options['type'] || {})['name'] === 'Boolean')
		? !!Number(value)
		: value) : undefined;
	const filter = hookProperty('filter', search || window.location.search, true) || {};

	if (valueProcessed === undefined) {
		delete filter[key];
	}
	else {
		filter[key] = valueProcessed;
	}
	return fireUpdate('filter', filter);
};
