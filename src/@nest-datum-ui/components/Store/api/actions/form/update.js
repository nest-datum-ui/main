import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormUpdate = ({
	entityId, 
	url,
	path,
	withAccessToken = false,
}) => async (snackbar = () => {}, callback = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const data = { ...Store().getState()[prefix].form[entityId] };
		const options = (Store().getState()[prefix].list[`options${entityId}`] || {}).data;

		delete data['loader'];
		delete data['options'];
		delete data['settins'];
		delete data['errors'];

		apiPath = `${url}/${path}/${entityId}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
				: {},
		}).toString()}`;

		await axios.patch(apiPath, data);

		if (Array.isArray(options)
			&& options.length > 0) {
			apiPath = `${url}/${path}/${entityId}/options?${new URLSearchParams({
				...withAccessToken
					? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
					: {},
			}).toString()}`;

			let i = 0,
				optionsPayload = [];

			while (i < options.length) {
				if (options[i]['dataTypeId'] === 'data-type-type-file') {
					if (Array.isArray(options[i].values)) {
						let ii = 0,
							values = [];

						while (ii < options[i].values.length) {
							try {
								delete options[i].values[ii]['errorSystemId'];
								delete (options[i].values[ii].content || {})['errorSystemId'];

								const fileNode = document.getElementById(`input-file-option-value-${options[i].values[ii]['id']}`);

								if (((options[i].values[ii].content || {}).src || '').indexOf('data:image/') === 0) {
									const formDataFiles = new FormData();

									formDataFiles.append('files', fileNode.files[0]);
									formDataFiles.append('systemId', options[i].values[ii].content['systemId']);

									const requestUploadFile = await axios.post(`${process.env.SERVICE_FILES}/file?${new URLSearchParams({
										...withAccessToken
											? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
											: {},
									}).toString()}`, formDataFiles);

									values.push({
										...options[i].values[ii],
										content: JSON.stringify({
											...options[i].values[ii].content,
											src: requestUploadFile.data[0]['path'],
										}),
										id: options[i].values[ii]['id'],
										parentId: options[i].values[ii]['parentId'],
										entityId: options[i].values[ii]['entityId'],
										entityOptionId: options[i].values[ii]['entityOptionId'],
									});
								}
								else {
									values.push({
										...options[i].values[ii],
										content: JSON.stringify(options[i].values[ii].content),
										id: options[i].values[ii]['id'],
										parentId: options[i].values[ii]['parentId'],
										entityId: options[i].values[ii]['entityId'],
										entityOptionId: options[i].values[ii]['entityOptionId'],
									});
								}
							}
							catch (err) {
							}
							ii++;
						}
						optionsPayload.push(values);
					}
				}
				else {
					optionsPayload.push(options[i].values);
				}
				i++;
			}
			await axios.post(apiPath, optionsPayload);
		}

		snackbar('Entity successfully updated.', { variant: 'success' });
		callback(entityId, data, options);
		actionApiFormProp(entityId, 'loader', false)();
	}
	catch (err) {
		const errorMessage = err.response
			? (err.response.data
				? err.response.data.message || (err.response.data.error
					? err.response.data.error.text
					: err.message)
				: err.message)
			: err.message;

		snackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
		actionApiFormProp(entityId, 'loader', false)();
	}
};

/**
 * @param {object} state - Current redux state
 * @param {object} action - Action data
 * @return {object} New state
 */
export const reducerFormUpdate = (state, action) => {
	if (state.form[action.payload.id]
		&& typeof state.form[action.payload.id] === 'object'
		&& !Array.isArray(state.form[action.payload.id])) {
		state.form[action.payload.id] = {
			...state.form[action.payload.id],
			...(action.payload || {}),
			loader: false,
			errors: {},
		};
	}
	return ({ 
		...state,
		form: {
			...state.form,
		}, 
	});
};
