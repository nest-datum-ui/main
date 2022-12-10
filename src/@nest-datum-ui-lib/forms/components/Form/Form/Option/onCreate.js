import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';

const onCreate = async ({
	enqueueSnackbar,
	storeName,
	entityId,
	withAccessToken,
	url,
	path,
	pathCreate,
}) => {
	try {
		await actionApiFormProp(storeName, 'loader', true)();
		await actionApiListProp(storeName, 'loader', true)();

		const { formId } = Store().getState()['api'].form[storeName];
		const errors = {};

		if (!validateStr(formId, true)) {
			errors['formId'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(formId)) {
			errors['formId'] = 'Cannot be empty.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(storeName, 'errors', errors)();
			await actionApiFormProp(storeName, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		actionApiFormCreate({
			entityId: storeName,
			url,
			path: pathCreate,
			withAccessToken,
		})(enqueueSnackbar, async (newPath = '') => {
			const newPathSplit = newPath.split('/');
			const newId = newPathSplit[newPathSplit.length - 1];
			const formData = { ...Store()
				.getState()['api']
				.form[newId] || {} };
			const listData = [ ...(Store()
				.getState()['api']
				.list[storeName] || {})
				.data ];


			listData.push(formData);

			await actionApiListProp(storeName, 'data', [ ...listData ])();
			await actionDialogClose(`${storeName}Item`)();
			await actionApiListProp(storeName, 'loader', false)();
		});
	}
	catch (err) {
		const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		enqueueSnackbar(`${errorMessage} - ${path}`, { variant: 'error' });
	}
};

export default onCreate;
