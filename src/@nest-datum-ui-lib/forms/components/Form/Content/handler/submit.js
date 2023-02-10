import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { FORMS_PATH_CONTENT } from '@nest-datum-ui-lib/forms/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(FORMS_PATH_CONTENT, 'loader', true)();

	const {
		id,
		contentStatusId,
		formId,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[FORMS_PATH_CONTENT] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrId(formId)
		&& (errors['formId'] = 'The value is in the wrong format.');
	!utilsCheckStrId(contentStatusId)
		&& (errors['contentStatusId'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(FORMS_PATH_CONTENT, 'errors', errors)();
		await actionApiFormProp(FORMS_PATH_CONTENT, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(FORMS_PATH_CONTENT, entityId)();
	}
	else {
		actionApiFormCreate(FORMS_PATH_CONTENT)();
	}
};

export default submit;
