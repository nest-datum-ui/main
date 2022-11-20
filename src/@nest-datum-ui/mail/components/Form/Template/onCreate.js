import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateBool from '@nest-datum-ui/utils/validate/bool.js';
import validateEmail from '@nest-datum-ui/utils/validate/email.js';

const onCreate = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			name,
			description,
			fromEmail,
			fromName,
			isNotDelete,
			templateStatusId,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validateStr(name)) {
			errors['name'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(name)) {
			errors['name'] = 'Cannot be empty.';
		}
		if (!validateStr(description, true)) {
			errors['description'] = 'The value is in the wrong format.';
		}
		if (!validateEmail(fromEmail, true)) {
			errors['fromEmail'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(fromEmail)) {
			errors['fromEmail'] = 'Cannot be empty.';
		}
		if (!validateStr(fromName)) {
			errors['fromName'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(fromName)) {
			errors['fromName'] = 'Cannot be empty.';
		}
		if (!validateBool(isNotDelete, true)) {
			errors['isNotDelete'] = 'The value is in the wrong format.';
		}
		if (!templateStatusId
			|| typeof templateStatusId !== 'string') {
			errors['templateStatusId'] = 'The value is in the wrong format.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_MAIL,
				path: 'template',
				withAccessToken: true,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_MAIL,
				path: 'template',
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

export default onCreate;
