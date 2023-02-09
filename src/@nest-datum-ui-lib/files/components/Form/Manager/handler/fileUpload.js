import Store from '@nest-datum-ui/components/Store';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import {
	FILES_PATH_FOLDER,
	FILES_PATH_FILE,
} from '@nest-datum-ui-lib/files/consts/path.js';

const fileUpload = async (e, {
	systemId,
}) => {
	const breadcrumbsData = (Store()
		.getState()
		.breadcrumbs
		.list['filesManageList'] || {})
		.data || [];
	const path = (breadcrumbsData[breadcrumbsData.length - 1] || {}).path;

	e.target.files['systemId'] = systemId;
	e.target.files['path'] = path;

	await actionApiFormProp(FILES_PATH_FILE, 'files', e.target.files)();
	await actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
	await actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
	await actionApiFormCreate(FILES_PATH_FILE, { notRedirect: true })();
};

export default fileUpload;
