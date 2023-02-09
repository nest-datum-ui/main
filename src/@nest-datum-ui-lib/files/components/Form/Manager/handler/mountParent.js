import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { FILES_PATH_FOLDER } from '@nest-datum-ui-lib/files/consts/path.js';

const mountParent = ({
	storeListName,
	fetchedInitParentId,
	systemId,
}) => {
	if (systemId && !fetchedInitParentId) {
		actionApiListGet(FILES_PATH_FOLDER, {
			storeListName: `${storeListName}parent`,
			page: 1,
			limit: 1,
			filter: {
				systemId,
			},
			sort: {
				createdAt: 'ASC',
			},
		})();
	}
};

export default mountParent;
