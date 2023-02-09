import Store from '@nest-datum-ui/components/Store';
import { fireListClear as actionApiListClear } from '@nest-datum-ui/components/Store/api/actions/list/clear.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { 
	FILES_PATH_FOLDER,
	FILES_PATH_FILE, 
} from '@nest-datum-ui-lib/files/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(FILES_PATH_FILE, 'loader', true)();

	const {
		id,
		name,
		description,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[FILES_PATH_FILE] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrDescription(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(FILES_PATH_FILE, 'errors', errors)();
		await actionApiFormProp(FILES_PATH_FILE, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
		actionApiFormUpdate(FILES_PATH_FILE, entityId)();
		actionDialogClose(`${FILES_PATH_FILE}/form`)();
	}
	else {
		actionApiListClear(FILES_PATH_FOLDER, { limit: 60 })();
		actionApiListClear(FILES_PATH_FILE, { limit: 60 })();
		actionApiListProp(FILES_PATH_FOLDER, 'allowLoadList', false)();
		actionApiFormCreate(FILES_PATH_FILE, { notRedirect: true })();
		actionDialogClose(`${FILES_PATH_FILE}/form`)();
	}
};

export default submit;
