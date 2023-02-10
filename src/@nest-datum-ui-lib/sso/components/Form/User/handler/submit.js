import Store from '@nest-datum-ui/components/Store';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreateOptions as actionApiFormCreateOptions } from '@nest-datum-ui/components/Store/api/actions/form/createOptions.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import { 
	SSO_PATH_USER,
	SSO_PATH_USER_OPTION, 
} from '@nest-datum-ui-lib/sso/consts/path.js';
import utilsCheckBool from '@nest-datum-ui/utils/check/bool.js';
import utilsCheckExists from '@nest-datum-ui/utils/check/exists.js';
import utilsCheckEntityExists from '@nest-datum-ui/utils/check/entity/exists.js';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrName from '@nest-datum-ui/utils/check/str/name.js';
import utilsCheckStrEmail from '@nest-datum-ui/utils/check/str/email.js';
import utilsCheckStrPassword from '@nest-datum-ui/utils/check/str/password.js';
import utilsCheckStrDate from '@nest-datum-ui/utils/check/str/date.js';

const submit = async (e, entityId) => {
	e.preventDefault();

	await actionApiFormProp(SSO_PATH_USER, 'loader', true)();

	const {
		id,
		login,
		email,
		password,
		emailVerifyKey,
		emailVerifiedAt,
		roleId,
		userStatusId,
		isNotDelete,
	} = ((Store()
		.getState()
		.api || {})
		.form || {})[SSO_PATH_USER] || {};
	const errors = {};

	(id && !utilsCheckStrId(id))
		&& (errors['id'] = 'The value is in the wrong format.');
	!utilsCheckStrName(login)
		&& (errors['login'] = 'The value is in the wrong format.');
	!utilsCheckStrEmail(email)
		&& (errors['email'] = 'The value is in the wrong format.');
	(password && !utilsCheckStrPassword(password))
		&& (errors['password'] = 'The value is in the wrong format.');
	(emailVerifyKey && !utilsCheckStr(emailVerifyKey))
		&& (errors['emailVerifyKey'] = 'The value is in the wrong format.');
	(emailVerifiedAt && !utilsCheckStrDate(emailVerifiedAt))
		&& (errors['emailVerifiedAt'] = 'The value is in the wrong format.');
	!utilsCheckStrId(roleId)
		&& (errors['roleId'] = 'The value is in the wrong format.');
	!utilsCheckStrId(userStatusId)
		&& (errors['userStatusId'] = 'The value is in the wrong format.');
	(utilsCheckExists(isNotDelete) && !utilsCheckBool(isNotDelete))
		&& (errors['isNotDelete'] = 'The value is in the wrong format.');

	if (Object.keys(errors).length > 0) {
		await actionApiFormProp(SSO_PATH_USER, 'errors', errors)();
		await actionApiFormProp(SSO_PATH_USER, 'loader', false)();
	}
	else if (utilsCheckEntityExists(entityId)) {
		actionApiFormUpdate(SSO_PATH_USER, entityId)();
		actionApiFormCreateOptions(SSO_PATH_USER_OPTION, { path: `${SSO_PATH_USER}/${entityId}/options` })();
	}
	else {
		actionApiFormCreate(SSO_PATH_USER)();
		actionApiFormCreateOptions(SSO_PATH_USER_OPTION, { path: `${SSO_PATH_USER}/${entityId}/options` })();
	}
};

export default submit;
