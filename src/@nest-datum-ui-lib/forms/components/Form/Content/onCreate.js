import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateBool from '@nest-datum-ui/utils/validate/bool.js';
import validateDataTypeId from '@nest-datum-ui/utils/validate/dataTypeId.js';

const onCreate = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			isNotDelete,
			contentStatusId,
			formId,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validateBool(isNotDelete, true)) {
			errors['isNotDelete'] = 'The value is in the wrong format.';
		}
		if (!contentStatusId
			|| typeof contentStatusId !== 'string') {
			errors['contentStatusId'] = 'The value is in the wrong format.';
		}
		if (!validateNotEmpty(formId)) {
			errors['formId'] = 'Cannot be empty.';
		}
		else if (!validateDataTypeId(formId)) {
			errors['formId'] = 'Specified data type does not exist.';
		}
		
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_FORMS,
				path: 'content',
				withAccessToken: true,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_FORMS,
				path: 'content',
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
