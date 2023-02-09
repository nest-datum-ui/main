import Store from '@nest-datum-ui/components/Store';
import { fireListGet as actionApiListGet } from '@nest-datum-ui/components/Store/api/actions/list/get.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsConvertStrObj from '@nest-datum-ui/utils/convert/str/obj.js';

const mount = ({
	storeListName,
	unmount,
	systemId,
	parentId,
	query = '',
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
		actionApiListProp(FILES_PATH_FILE, 'loader', false)();

		const prevSystemIdMemo = (Store()
			.getState()
			.api
			.form[storeListName] || {})
			.prevSystemIdMemo;
		const {
			total,
			prevPage,
			prevLimit,
			data,
		} = Store()
			.getState()
			.api
			.list[FILES_PATH_FOLDER] || {};
		const {
			total: filesTotal = 0,
			data: filesData,
		} = Store()
			.getState()
			.api
			.list[FILES_PATH_FILE] || {};
		const filesDataLength = (filesData || []).length;
		const breadcrumbs = Store()
			.getState()
			.breadcrumbs
			.list['filesManageList'] || {};
		const breadcrumbsPathPrev = (breadcrumbs.prev || {}).path;
		const { 
			path: breadcrumbsPath,
			key: breadcrumbsKey, 
		} = ((breadcrumbs.data || [])[(breadcrumbs.data || []).length - 1] || {});
		const folderLoading = (allowLoadFoldersFull || allowLoadFiles)
			&& (breadcrumbsPathPrev
				? ((parentId === breadcrumbsKey)
					? (prevPage !== page 
						|| prevLimit !== limit
						|| ((breadcrumbsPathPrev || '').length > (breadcrumbsPath || '').length && allowLoadFiles)
						|| (prevSystemIdMemo && prevSystemIdMemo !== systemId))
					: (prevPage === page 
						|| prevLimit === limit
						|| ((breadcrumbsPathPrev || '').length > (breadcrumbsPath || '').length)
						|| (prevSystemIdMemo && prevSystemIdMemo !== systemId)))
				: ((total === undefined)
					? (!prevLimit && !prevPage)
						? allowLoadFiles
						: (prevPage !== page 
							|| prevLimit !== limit)
					: (prevPage !== page 
						|| prevLimit !== limit)));

		if (folderLoading) {
			actionApiListProp(FILES_PATH_FILE, 'data', [])();
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
				? (parentId === breadcrumbsKey
					&& (prevPage !== page 
						|| prevLimit !== limit
						|| (data || []).length === 0
						|| (data || []).length < limit))
				: (total >= 0))) {
			const filesLimit = (total < (limit * page))
				? Math.abs(total - (limit * page))
				: limit;
			const filePage = (filesDataLength < limit && filesDataLength < filesTotal)
				? 1
				: Math.ceil(Math.abs(total - limit * page) / limit);

			actionApiListProp(FILES_PATH_FILE, 'data', [])();
			actionApiListGet(FILES_PATH_FILE, {
				page: filePage,
				limit: (filesLimit > limit)
					? limit
					: filesLimit,
				query,
				select,
				sort,
				filter: {
					...(filesDataLength < limit && filesDataLength < filesTotal)
						? { 
							id: [ 
								'$Not',
								'$In',
								...(filesData || []).map((item) => item.id),
							], 
						}
						: {},
					...utilsConvertStrObj(filter),
					parentId,
					systemId,
				},
			})(async (store) => {
				if (filesDataLength < limit && filesDataLength < filesTotal) {
					await actionApiListProp(FILES_PATH_FILE, 'total', filesTotal)();
				}
			});
			actionApiListProp(FILES_PATH_FOLDER, 'loader', false)();
		}
	}
};

export default mount;
