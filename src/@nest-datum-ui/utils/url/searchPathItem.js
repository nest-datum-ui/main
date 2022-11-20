
const searchPathItem = (item, search, parseJson) => {
	const searchPath = search ?? window
		.location
		.search;

	if (searchPath[0] !== '?') {
		return undefined;
	}
	let output = ((searchPath
		.slice(1)
		.split('&')
		.find((searchPathItem) => searchPathItem.indexOf(item +'=') === 0) || '')
		.split(item +'='))[1];

	if (output) {
		output = decodeURI(output);

		if (parseJson) {
			try {
				return JSON.parse(output) || undefined;
			}
			catch (err) {
				return undefined;
			}
		}
		return output;
	}
	return undefined;
};

export default searchPathItem;
