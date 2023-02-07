import Store from '@nest-datum-ui/components/Store';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
// import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsConvertStrObj from '@nest-datum-ui/utils/convert/str/obj.js';

const mount = ({
	unmount,
	systemId,
	parentId,
	query,
	select,
	filter,
	sort,
	page,
	limit,
	allowLoadFolders,
	allowLoadFoldersFull,
	allowLoadFiles,
}) => {
	if (!unmount 
		&& utilsCheckEntityExists(systemId)
		&& parentId) {
		const {
			total,
			prevPage,
			prevLimit,
		} = Store()
			.getState()
			.api
			.list[FILES_PATH_FOLDER] || {};
		const breadcrumbs = Store()
			.getState()
			.breadcrumbs
			.list['filesManageList'] || {};
		const breadcrumbsPathPrev = (breadcrumbs.prev || {}).path;
		const { key: breadcrumbsKey } = ((breadcrumbs.data || [])[(breadcrumbs.data || []).length - 1] || {});
		
		if ((allowLoadFoldersFull || allowLoadFiles)
			&& (prevPage !== page 
				|| prevLimit !== limit 
				|| (breadcrumbsPathPrev
					? (parentId === breadcrumbsKey)
					: !(total > 0)))) {
			actionApiListGet(FILES_PATH_FOLDER, {
				page,
				limit,
				query,
				select,
				sort,
				filter: {
					...utilsConvertStrObj(filter),
					parentId,
					systemId,
				},
			})();
			actionApiListProp(FILES_PATH_FOLDER, 'prevPage', page)();
			actionApiListProp(FILES_PATH_FOLDER, 'prevLimit', limit)();
		}
		if (allowLoadFiles 
			&& !allowLoadFolders
			&& (breadcrumbsPathPrev
				? (parentId === breadcrumbsKey)
				: (total >= 0))) {
			const filesLimit = (total < (limit * page))
				? Math.abs(total - (limit * page))
				: limit;

			actionApiListGet(FILES_PATH_FILE, {
				page: Math.ceil(Math.abs(total - limit * page) / limit),
				limit: (filesLimit > limit)
					? limit
					: filesLimit,
				query,
				select,
				sort,
				filter: {
					...utilsConvertStrObj(filter),
					parentId,
					systemId,
				},
			})();
			actionApiListProp(FILES_PATH_FOLDER, 'loader', false)();
		}
	}
};

export default mount;
