import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckObjFilled from '@nest-datum-ui/utils/check/obj/filled.js';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';

const withToken = (url, data = {}) => {
	const accessToken = localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`);
	let key,
		processed = {};

	if (utilsCheckObjFilled(data)) {
		for (key in data) {
			if (utilsCheckExists(data[key])) {
				processed[key] = (utilsCheckObj(data[key]) || utilsCheckArr(data[key]))
					? JSON.stringify(data[key])
					: data[key];
			}
		}
	}
	if (!processed['query']) {
		delete processed['query'];
	}
	return (utilsCheckObjFilled(processed))
		? `${url}?${new URLSearchParams({
			...processed,
			...accessToken
				? { accessToken }
				: {},
		}).toString()}`
		: `${url}${(utilsCheckStr(accessToken) ? `?accessToken=${accessToken}` : '')}`;
};

export default withToken;
