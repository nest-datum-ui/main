import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';

const onCreate = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			action,
			content,
			letterStatusId,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validateStr(action)) {
			errors['action'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(action)) {
			errors['action'] = 'Cannot be empty.';
		}
		if (!validateStr(content)) {
			errors['content'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(content)) {
			errors['content'] = 'Cannot be empty.';
		}
		if (!letterStatusId
			|| typeof letterStatusId !== 'string') {
			errors['letterStatusId'] = 'The value is in the wrong format.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			// throw new Error('Check that the form is filled out correctly.');
			return;
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_MAIL,
				path: 'report',
				withAccessToken: true,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_MAIL,
				path: 'report',
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
