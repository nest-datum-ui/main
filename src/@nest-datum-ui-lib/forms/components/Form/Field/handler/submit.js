import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreateOptions as actionApiFormCreateOptions } from '@nest-datum-ui/components/Store/api/actions/form/createOptions.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { 
	FORMS_PATH_FIELD,
	FORMS_PATH_FIELD_OPTION, 
} from '@nest-datum-ui-lib/forms/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';
import utilsCheckStrDataType from '@nest-datum-ui/utils/check/str/dataType';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(FORMS_PATH_FIELD, 'loader', true)();

	const {
		id,
		name,
		description,
		dataTypeId,
		fieldStatusId,
		isRequired,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[FORMS_PATH_FIELD] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	!utilsCheckStrDataType(dataTypeId)
		&& (errors['dataTypeId'] = 'The value is in the wrong format.');
	!utilsCheckStrId(fieldStatusId)
		&& (errors['fieldStatusId'] = 'The value is in the wrong format.');
	(utilsCheckExists(isRequired) && !utilsCheckBool(isRequired))
		&& (errors['isRequired'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(FORMS_PATH_FIELD, 'errors', errors)();
		await actionApiFormProp(FORMS_PATH_FIELD, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(FORMS_PATH_FIELD, entityId)();
		actionApiFormCreateOptions(FORMS_PATH_FIELD_OPTION, { path: `${FORMS_PATH_FIELD}/${entityId}/options` })();
	}
	else {
		actionApiFormCreate(FORMS_PATH_FIELD)();
		actionApiFormCreateOptions(FORMS_PATH_FIELD_OPTION, { path: `${FORMS_PATH_FIELD}/${entityId}/options` })();
	}
};

export default submit;
