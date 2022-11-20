import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateBool from '@nest-datum-ui/utils/validate/bool.js';

const onSave = async ({
	entityId, 
	url,
	path,
	withAccessToken = false,
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			name,
			description,
			isNotDelete,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'Значение указано в неверном формате.';
		}
		if (!validateStr(name)) {
			errors['name'] = 'Значение указано в неверном формате.';
		}
		else if (!validateNotEmpty(name)) {
			errors['name'] = 'Не может быть пустым.';
		}
		if (!validateStr(description, true)) {
			errors['description'] = 'Значение указано в неверном формате.';
		}
		if (!validateBool(isNotDelete, true)) {
			errors['isNotDelete'] = 'Значение указано в неверном формате.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Проверте правильность заполнения формы.');
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url,
				path,
				withAccessToken,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url,
				path,
				withAccessToken,
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

export default onSave;
