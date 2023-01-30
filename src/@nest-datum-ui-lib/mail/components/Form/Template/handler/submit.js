import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreateOptions as actionApiFormCreateOptions } from '@nest-datum-ui/components/Store/api/actions/form/createOptions.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { 
	MAIL_PATH_TEMPLATE,
	MAIL_PATH_TEMPLATE_OPTION, 
} from '@nest-datum-ui-lib/mail/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrEmail from '@nest-datum-ui/utils/check/str/email.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrDescription from '@nest-datum-ui/utils/check/str/description.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(MAIL_PATH_TEMPLATE, 'loader', true)();

	const {
		id,
		name,
		description,
		fromEmail,
		fromName,
		templateStatusId,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[MAIL_PATH_TEMPLATE] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(name)
		&& (errors['name'] = 'The value is in the wrong format.');
	!utilsCheckStrName(fromName)
		&& (errors['fromName'] = 'The value is in the wrong format.');
	!utilsCheckStrEmail(fromEmail)
		&& (errors['fromEmail'] = 'The value is in the wrong format.');
	(description && !utilsCheckStrDescription(description))
		&& (errors['description'] = 'The value is in the wrong format.');
	!utilsCheckStrId(templateStatusId)
		&& (errors['templateStatusId'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(MAIL_PATH_TEMPLATE, 'errors', errors)();
		await actionApiFormProp(MAIL_PATH_TEMPLATE, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(MAIL_PATH_TEMPLATE, entityId)();
		actionApiFormCreateOptions(MAIL_PATH_TEMPLATE_OPTION, { path: `${MAIL_PATH_TEMPLATE}/${entityId}/options` })();
	}
	else {
		actionApiFormCreate(MAIL_PATH_TEMPLATE)();
		actionApiFormCreateOptions(MAIL_PATH_TEMPLATE_OPTION, { path: `${MAIL_PATH_TEMPLATE}/${entityId}/options` })();
	}
};

export default submit;
