import { 
	obj as utilsCheckObj,
	arr as utilsCheckArr, 
} from '@nest-datum-utils/check';
import { hookNavigate } from '../hooks';

export const fireUpdate = async (key, value, search) => setTimeout(() => {
	const searchSplit = (search || window.location.search)
		.split('?')
		.slice(1)
		.join('?')
		.split('&')
		.filter((item) => item && item);
	const itemIndex = searchSplit.findIndex((item) => item.indexOf(`${key}=`) === 0);
	const valueProcessed = (utilsCheckObj(value) || utilsCheckArr(value))
		? (Object.keys(value).length > 0
			? JSON.stringify(value)
			: undefined)
		: value;

	if (itemIndex >= 0) {
		if (valueProcessed === undefined) {
			searchSplit.splice(itemIndex, 1);
		}
		else {
			searchSplit[itemIndex] = `${key}=${valueProcessed}`;
		}
	}
	else {
		searchSplit.push(`${key}=${valueProcessed}`);
	}
	return hookNavigate(`${window.location.pathname}?${searchSplit.join('&')}`);
}, 0);
