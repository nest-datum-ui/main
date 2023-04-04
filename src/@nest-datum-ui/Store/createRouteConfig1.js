import {
	obj as utilsCheckObj,
	str as utilsCheckStr,
} from '@nest-datum-utils/check';

const createRouteConfig = (data = {}) => {
	let routeKey;

	for (routeKey in data.routes) {
		const currentRoute = data.routes[routeKey];
		let entityKey;

		for (entityKey in currentRoute) {
			if (utilsCheckObj(currentRoute[entityKey])
				&& utilsCheckStr(currentRoute[entityKey]['apiUrl'])) {
				data.routes[routeKey][entityKey]['apiUrl'] = data['apiUrl'] +'/'+ data.routes[routeKey][entityKey]['apiUrl'];
			}
		}
	}
	return data;
};

export default createRouteConfig;
