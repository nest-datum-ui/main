import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { SSO_PATH_USER_OPTION } from '@nest-datum-ui-lib/sso/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';
import utilsCheckStrRegex from '@nest-datum-ui/utils/check/str/regex.js';
import utilsCheckStrDataType from '@nest-datum-ui/utils/check/str/dataType';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(SSO_PATH_USER_OPTION, 'loader', true)();

	const {
		id,
		name,
		description,
		dataTypeId,
		regex,
		isRequired,
		isMultiline,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[SSO_PATH_USER_OPTION] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	!utilsCheckStrDataType(dataTypeId)
		&& (errors['dataTypeId'] = 'The value is in the wrong format.');
	(regex && !utilsCheckStrRegex(regex))
		&& (errors['regex'] = 'The value is in the wrong format.');
	(utilsCheckExists(isRequired) && !utilsCheckBool(isRequired))
		&& (errors['isRequired'] = 'The value is in the wrong format.');
	(utilsCheckExists(isMultiline) && !utilsCheckBool(isMultiline))
		&& (errors['isMultiline'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(SSO_PATH_USER_OPTION, 'errors', errors)();
		await actionApiFormProp(SSO_PATH_USER_OPTION, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(SSO_PATH_USER_OPTION, entityId)();
	}
	else {
		actionApiFormCreate(SSO_PATH_USER_OPTION)();
	}
};

export default submit;
