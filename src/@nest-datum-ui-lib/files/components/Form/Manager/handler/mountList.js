import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';

const mountList = (key, setParentId) => {
	if (key) {
		setParentId(key);
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60, allowLoadList: true })();
	}
};

export default mountList;
