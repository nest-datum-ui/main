import importSchema from 'importSchema.js';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import { fireShow as actionLoaderShow } from '@nest-datum-ui/components/Store/loader/actions/show.js';
import { fireHide as actionLoaderHide } from '@nest-datum-ui/components/Store/loader/actions/hide.js';

let timeout;
const asyncLoad = (serviceKey) => {
	if (utilsCheckStr(serviceKey)) {
		actionLoaderShow('window')();
		clearTimeout(timeout);

		timeout = setTimeout(async () => {
			try {
				actionLoaderHide('window', ((await importSchema[serviceKey]()) || {})['default'])();
			}
			catch (err) {
				actionLoaderHide('window', (await import('@nest-datum-ui/routes/NotFound') || {})['default'])();
			}
		}, 0);
	}
};

export default asyncLoad;
