import { strToObj as utilsFormatStrToObj } from '@nest-datum-utils/format';

const hookProperty = (propertyKey, search, parseJson = false) => {
	const searchPath = search ?? window
		.location
		.search;

	if (searchPath[0] !== '?') {
		return undefined;
	}
	let output = ((searchPath
		.slice(1)
		.split('&')
		.find((propertyKeyItem) => propertyKeyItem.indexOf(propertyKey +'=') === 0) || '')
		.split(propertyKey +'='))[1];

	if (output) {
		output = decodeURI(output);

		if (parseJson) {
			return utilsFormatStrToObj(output);
		}
		return output;
	}
	return undefined;
};

export default hookProperty;
