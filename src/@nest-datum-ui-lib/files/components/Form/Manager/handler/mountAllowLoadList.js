import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { FILES_PATH_FOLDER } from '@nest-datum-ui-lib/files/consts/path.js';

let allowLoadListTimeout;
const mountAllowLoadList = (allowLoadList) => {
	if (!allowLoadList) {
		clearTimeout(allowLoadListTimeout);

		allowLoadListTimeout = setTimeout(() => {
			actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', true)();
		}, 600);
	}
};

export default mountAllowLoadList;
