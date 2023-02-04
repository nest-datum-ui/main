import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreateOptions as actionApiFormCreateOptions } from '@nest-datum-ui/components/Store/api/actions/form/createOptions.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { 
	DATA_TYPE_PATH_TYPE,
	DATA_TYPE_PATH_TYPE_OPTION, 
} from '@nest-datum-ui-lib/data-type/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';
import utilsCheckStrDataType from '@nest-datum-ui/utils/check/str/dataType';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(DATA_TYPE_PATH_TYPE, 'loader', true)();

	const {
		id,
		name,
		description,
		parentId,
		typeStatusId,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[DATA_TYPE_PATH_TYPE] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	(parentId && !utilsCheckStrDataType(parentId))
		&& (errors['parentId'] = 'The value is in the wrong format.');
	!utilsCheckStrId(typeStatusId)
		&& (errors['typeStatusId'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(DATA_TYPE_PATH_TYPE, 'errors', errors)();
		await actionApiFormProp(DATA_TYPE_PATH_TYPE, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(DATA_TYPE_PATH_TYPE, entityId)();
		actionApiFormCreateOptions(DATA_TYPE_PATH_TYPE_OPTION, { path: `${DATA_TYPE_PATH_TYPE}/${entityId}/options` })();
	}
	else {
		actionApiFormCreate(DATA_TYPE_PATH_TYPE)();
		actionApiFormCreateOptions(DATA_TYPE_PATH_TYPE_OPTION, { path: `${DATA_TYPE_PATH_TYPE}/${entityId}/options` })();
	}
};

export default submit;
