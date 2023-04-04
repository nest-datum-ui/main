import { createRouteContext } from '@nest-datum-ui/Context';

const config = createRouteContext({
	name: 'registry',
	pageUrl: 'registry',
	apiUrl: process.env.URL_API_REGISTRY,
	routes: {
		serv: {
			title: 'Services list',
			pageUrl: 'serv',
			form: {
				id: 'serv',
				storeName: 'serv',
				apiUrl: 'serv',
			},
		},
	},
});

export default config;
