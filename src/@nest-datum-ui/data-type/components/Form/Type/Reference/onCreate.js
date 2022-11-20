import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';

const onCreate = async ({
	enqueueSnackbar,
	listStoreName,
	entityId,
}) => {
	let apiPath = '';

	try {
		await actionApiFormProp(entityId, 'loader', true)();
		await actionApiListProp(listStoreName, 'loader', true)();

		const { typeId } = Store().getState()['api'].form[entityId];
		const errors = {};

		apiPath = `type/${typeId}/options/${entityId}`;

		if (!validateStr(typeId, true)) {
			errors['typeId'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(typeId)) {
			errors['typeId'] = 'Cannot be empty.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		actionApiFormCreate({
			entityId,
			url: process.env.SERVICE_DATA_TYPE,
			path: `type/${typeId}/options/${entityId}`,
			withAccessToken: true,
		})(enqueueSnackbar, async (newPath = '') => {
			const newPathSplit = newPath.split('/');
			const newId = newPathSplit[newPathSplit.length - 1];
			const formStoreNameData = { ...Store()
				.getState()['api']
				.form[newId] || {} };
			const listStoreNameData = [ ...(Store()
				.getState()['api']
				.list[listStoreName] || {})
				.data ];


			listStoreNameData.push(formStoreNameData);

			await actionApiListProp(listStoreName, 'data', [ ...listStoreNameData ])();
			await actionDialogClose('dataTypeTypeReferenceItem')();
			await actionApiListProp(listStoreName, 'loader', false)();
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

		enqueueSnackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
	}
};

export default onCreate;
