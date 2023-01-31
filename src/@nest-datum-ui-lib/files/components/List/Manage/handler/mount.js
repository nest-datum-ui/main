import Store from '@nest-datum-ui/components/Store';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsConvertStrObj from '@nest-datum-ui/utils/convert/str/obj.js';

const mount = ({
	unmount,
	systemId,
	query,
	select,
	filter,
	sort,
	folderPage,
	folderLimit,
	allowLoadFolders,
	allowLoadFiles,
}) => {
	if (!unmount 
		&& utilsCheckEntityExists(systemId)) {
		const {
			total: folderTotal,
			data: folderData,
			prevPage,
			prevLimit,
		} = Store()
			.getState()
			.api
			.list[FILES_PATH_FOLDER] || {};
		const allowLoadFiles = folderLimit > (folderData || []).length 
			&& utilsCheckArr(folderData, (folderData || []).length);

		actionApiListProp(FILES_PATH_FILE, 'loader', false)();
		actionApiListProp(FILES_PATH_FILE, 'data', [])();

		console.log('prevPage', allowLoadFolders, folderTotal, folderLimit)

		if ((allowLoadFolders || allowLoadFiles || folderTotal <= folderLimit)
			&& (prevPage !== folderPage || prevLimit !== folderLimit)) {
			actionApiListGet(FILES_PATH_FOLDER, {
				page: folderPage,
				limit: folderLimit,
				query,
				select,
				filter: {
					...utilsConvertStrObj(filter),
					// systemId
				},
				sort,
			})();
			actionApiListProp(FILES_PATH_FOLDER, 'prevPage', folderPage)();
			actionApiListProp(FILES_PATH_FOLDER, 'prevLimit', folderLimit)();
		}
		if (allowLoadFiles && !allowLoadFolders) {
			const fileLimit = (folderTotal < (folderLimit * folderPage))
				? Math.abs(folderTotal - (folderLimit * folderPage))
				: folderLimit;

			actionApiListGet(FILES_PATH_FILE, {
				page: Math.ceil(Math.abs(folderTotal - folderLimit * folderPage) / folderLimit),
				limit: fileLimit > folderLimit
					? folderLimit
					: fileLimit,
				query,
				select,
				filter: {
					...utilsConvertStrObj(filter),
					// systemId
				},
				sort,
			})();
			actionApiListProp(FILES_PATH_FOLDER, 'loader', false)();
		}
	}
};

export default mount;
