import Store from '@nest-datum-ui/components/Store';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireListSet as actionBreadcrumbsListSet } from '@nest-datum-ui/components/Store/breadcrumbs/actions/list/set.js';
import { FILES_PATH_SYSTEM } from '@nest-datum-ui-lib/files/consts/path.js';

const mount = ({
	storeListName,
	displayBreadcrumbs,
	parentId,
	systemId,
	key,
}) => {
	if (displayBreadcrumbs === true
		&& utilsCheckStrId(parentId)
		&& utilsCheckStrId(systemId)) {
		const system = ((Store()
			.getState()
			.api
			.list[FILES_PATH_SYSTEM] || {})
			.data || [])
			.find((item) => item['id'] === systemId);
		const prevSystemIdMemo = (Store()
			.getState()
			.api
			.form[storeListName] || {})
			.prevSystemIdMemo;
		const systemOption = ((system || {})['systemSystemOptions'] || [])
			.find((item) => item['systemOptionId'] === 'files-system-option-root');
		const path = ((((systemOption && systemOption['systemSystemSystemOptions']) || [])
			.find((item) => item['systemSystemOptionId'] === systemOption['id'])) || {})
			.content;

		if (path
			&& (!key || (key && prevSystemIdMemo && prevSystemIdMemo !== systemId))) {
			actionApiFormProp(storeListName, 'prevSystemIdMemo', systemId)();
			actionBreadcrumbsListSet('filesManageList', [{
				key: parentId,
				text: '...',
				path,
			}])();
		}
	}
};

export default mount;
