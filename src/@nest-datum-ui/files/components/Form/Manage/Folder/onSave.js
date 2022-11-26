import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateBool from '@nest-datum-ui/utils/validate/bool.js';
import validatePath from '@nest-datum-ui/utils/validate/path.js';

const onSave = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp('filesManageSystem', 'loader', true)();
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			name,
			description,
			isNotDelete,
			path,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validatePath(path)) {
			errors['path'] = 'The value is in the wrong format.';
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
		if (!validateBool(isNotDelete, true)) {
			errors['isNotDelete'] = 'The value is in the wrong format.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		(entityId === '0')
			? await actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_FILES,
				path: 'folder',
				withAccessToken: true,
				notRedirect: true,
			})(enqueueSnackbar, navigate, async (response) => {
				const filesManageFolderList = [ ...((Store()
					.getState()
					.api
					.list
					.filesManageFolderList || {})
					.data || []) ];

				filesManageFolderList.push(response);

				await actionApiListProp('filesManageFolderList', 'data', [ ...filesManageFolderList ])();
				await actionApiListProp('filesManageFolderList', 'loader', false)();
				await actionApiFormProp('filesManageSystem', 'loader', false)();

				navigate(`/files/manage`);
			})
			: await actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_FILES,
				path: 'folder',
				withAccessToken: true,
			})(enqueueSnackbar, async (id, data, options) => {
				const filesManageFolderList = [ ...((Store()
					.getState()
					.api
					.list
					.filesManageFolderList || {})
					.data || []) ];
				const findIndex = filesManageFolderList.findIndex((folder) => folder.id === id);

				if (filesManageFolderList[findIndex]) {
					const pathSplit = filesManageFolderList[findIndex]['path'].split('/');

					pathSplit.splice(pathSplit.length - 1, 1);
					filesManageFolderList[findIndex] = {
						...filesManageFolderList[findIndex],
						...data,
						id,
						path: `${pathSplit.join('/')}/${data['name'] || filesManageFolderList[findIndex]['name']}`,
					};

					await actionApiListProp('filesManageFolderList', 'data', [ ...filesManageFolderList ])();
					await actionApiFormProp('filesManageSystem', 'loader', false)();

					navigate(`/files/manage`);
				}
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

		enqueueSnackbar(errorMessage, { variant: 'error' });
	}
};

export default onSave;
