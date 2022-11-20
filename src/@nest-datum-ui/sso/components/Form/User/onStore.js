import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateBool from '@nest-datum-ui/utils/validate/bool.js';
import validateEmail from '@nest-datum-ui/utils/validate/email.js';
import validateDate from '@nest-datum-ui/utils/validate/date.js';

const onStore = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

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
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validateStr(login)) {
			errors['login'] = 'The value is in the wrong format.';
		}
		if (!validateEmail(email, true)) {
			errors['email'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(email)) {
			errors['email'] = 'Не может быть пустым.';
		}
		if (!validateStr(password, (!entityId || entityId === '0') ? false : true)) {
			errors['password'] = 'The value is in the wrong format.';
		}
		if (!validateStr(emailVerifyKey, true)) {
			errors['emailVerifyKey'] = 'The value is in the wrong format.';
		}
		if (!validateDate(emailVerifiedAt, true)) {
			errors['emailVerifiedAt'] = 'The value is in the wrong format.';
		}
		if (!validateBool(isNotDelete, true)) {
			errors['isNotDelete'] = 'The value is in the wrong format.';
		}
		if (!roleId
			|| typeof roleId !== 'string') {
			errors['roleId'] = 'The value is in the wrong format.';
		}
		if (!userStatusId
			|| typeof userStatusId !== 'string') {
			errors['userStatusId'] = 'The value is in the wrong format.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_SSO,
				path: 'user',
				withAccessToken: true,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_SSO,
				path: 'user',
				withAccessToken: true,
			})(enqueueSnackbar);
	}
	catch (err) {
		const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		enqueueSnackbar(errorMessage, { variant: 'error' });
	}
};

export default onStore;
