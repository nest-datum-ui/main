import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { FILES_PATH_PROVIDER_STATUS } from '@nest-datum-ui-lib/files/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(FILES_PATH_PROVIDER_STATUS, 'loader', true)();

	const {
		id,
		name,
		description,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[FILES_PATH_PROVIDER_STATUS] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(FILES_PATH_PROVIDER_STATUS, 'errors', errors)();
		await actionApiFormProp(FILES_PATH_PROVIDER_STATUS, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(FILES_PATH_PROVIDER_STATUS, entityId)();
	}
	else {
		actionApiFormCreate(FILES_PATH_PROVIDER_STATUS)();
	}
};

export default submit;
