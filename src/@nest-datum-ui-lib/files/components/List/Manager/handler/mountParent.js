import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { FILES_PATH_FOLDER } from '@nest-datum-ui-lib/files/consts/path.js';

const mountParent = ({
	storeListName,
	systemId,
	parentId,
}) => {
	if (systemId && parentId) {
		actionApiListGet(FILES_PATH_FOLDER, {
			storeListName,
			page: 1,
			limit: 1,
			filter: {
				systemId,
				id: parentId,
			},
		})();
	}
};

export default mountParent;
