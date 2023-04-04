import React from 'react';
import {
	arr as utilsCheckArr,
	obj as utilsCheckObj,
	strUrl as utilsCheckStrUrl,
	strFilled as utilsCheckStrFilled,
	func as utilsCheckFunc,
} from '@nest-datum-utils/check';

let apiBaseUrl = '',
	pageBaseUrl = '',
	pagePrefixUrl = '',
	prevPage;

const Props = React.createContext({});

const _recursiveLoop = (data = {}, deep = 0) => {
	let key;

	for (key in data) {
		let value = data[key];

		if (utilsCheckFunc(value) && value['name'] === 'createRouteContext') {
			value = value();
		}
		if (utilsCheckObj(value)) {
			value = _recursiveLoop({ ...value }, deep + 1);
		}
		if (utilsCheckArr(value)) {
			value = value.map((item) => utilsCheckObj(item)
				? _recursiveLoop({ ...item }, deep + 1)
				: item);
		}
		if (utilsCheckStrUrl(value)
			&& key === 'apiBaseUrl') {
			apiBaseUrl = value;
		}
		if (utilsCheckStrUrl(apiBaseUrl)
			&& utilsCheckStrFilled(value)
			&& key === 'apiUrl') {
			data['apiFullUrl'] = (value.indexOf('https://') === 0
				|| value.indexOf('http://') === 0)
				? value
				: (apiBaseUrl +'/'+ value);
		}
		if (utilsCheckStrFilled(value)
			&& key === 'pagePrefixUrl') {
			pagePrefixUrl = value;
		}
		if (utilsCheckStrFilled(value)
			&& key === 'pageBaseUrl') {
			pageBaseUrl = data[`pageBaseFullUrl`] = `${pagePrefixUrl ? ('/'+ pagePrefixUrl) : ''}/${value}`;
		}
		if (utilsCheckStrFilled(pageBaseUrl)
			&& (key === 'pageUrl' || key === 'pageInitialUrl')) {
			data[key === 'pageUrl'
				? 'pageFullUrl'
				: 'pageInitialFullUrl'] = `${pageBaseUrl}/${value}`;
		}
		if (key === 'to') {
			data[key] = value = (utilsCheckStrFilled(pageBaseUrl) ? pageBaseUrl : '') + `${data['to'][0] === '/' ? '' : '/'}${data['to']}`;
		}
		if (utilsCheckStrFilled(pageBaseUrl)
			&& key === 'headerTabMenuTitle'
			&& deep === 2) {
			prevPage = [{
				key:  `${pageBaseUrl}/${data['pageUrl']}`,
				text: data['breadcrumbsMenuTitle'],
				orderInHeaderTabMenu: data['orderInHeaderTabMenu'],
			}];
		}
		if (deep === 3 
			&& key === 'breadcrumbsMenuTitle'
			&& utilsCheckStrFilled(value)) {
			data['prevPage'] = prevPage;
		}
		data[key] = value;
	}
	return data;
};

function create (data = {}) {
	return _recursiveLoop({ ...data });
}

export default Props;
export {
	create,
};