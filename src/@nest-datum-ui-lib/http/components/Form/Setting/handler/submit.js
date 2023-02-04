import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { HTTP_PATH_SETTING } from '@nest-datum-ui-lib/http/consts/path.js';
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

	await actionApiFormProp(HTTP_PATH_SETTING, 'loader', true)();

	const {
		id,
		name,
		description,
		dataTypeId,
		regex,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[HTTP_PATH_SETTING] || {};
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
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(HTTP_PATH_SETTING, 'errors', errors)();
		await actionApiFormProp(HTTP_PATH_SETTING, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(HTTP_PATH_SETTING, entityId)();
	}
	else {
		actionApiFormCreate(HTTP_PATH_SETTING)();
	}
};

export default submit;
