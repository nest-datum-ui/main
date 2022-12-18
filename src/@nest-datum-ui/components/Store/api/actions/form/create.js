import { fireFormProp as actionApiFormProp } from './prop.js';
import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';

/**
 * @return {Function}
 */
export const fireFormCreate = ({
	entityId, 
	url,
	path,
	withAccessToken = false,
	notRedirect = false,
}) => async (snackbar = () => {}, navigate = () => {}, callback = () => {}, prefix = 'api') => {
	let apiPath = '';

	try {
		await actionApiFormProp(entityId, 'loader', true)();

		let data = { ...Store().getState()[prefix].form[entityId] };

		delete data['loader'];
		delete data['options'];
		delete data['settins'];
		delete data['errors'];

		apiPath = `${url}/${path}?${new URLSearchParams({
			...withAccessToken
				? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
				: {},
		}).toString()}`;

		let key,
			filesResponses = [];

		for (key in data) {
			if (data[key]
				&& typeof data[key] === 'object'
				&& data[key].constructor.name === 'FileList') {
				const formData = new FormData();
				let i = 0;

				while (i < data[key].length) {
					formData.append('files', data[key][i]);
					i++;
				}
				formData.append('systemId', data[key]['systemId']);
				formData.append('path', data[key]['path']);
				
				const request = await axios.post(`${process.env.SERVICE_FILES}/file?${new URLSearchParams({
					...withAccessToken
						? { accessToken: localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`) }
						: {},
				}).toString()}`, formData);
				
				filesResponses.push(request.data);
				data[key] = JSON.stringify({
					systemId: request.data[0]['systemId'],
					src: request.data[0]['path'],
					id: request.data[0]['id'],
					type: request.data[0]['type'],
				});
			}
		}

		//TODO: filesManageSystem - зарезирвированный id
		if (entityId !== 'filesManageSystem') {
				const request = await axios.post(apiPath, data);
				const newId = request.data.id;

				Store().dispatch({
					type: prefix +'.formCreate',
					payload: {
						data: request.data,
						callback,
						filesResponses,
					},
				});
				if (!notRedirect) {
					const pathnameSplit = window.location.pathname.split('/');
					
					pathnameSplit.splice(pathnameSplit.length - 1, 1);

					const newPath = `${pathnameSplit.join('/')}/${newId}`;

					navigate(newPath);
				}
		}
		else {
			Store().dispatch({
				type: prefix +'.formCreate',
				payload: {
					data: {
						id: entityId,
					},
					callback,
					filesResponses,
				},
			});
		}
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
export const reducerFormCreate = (state, action) => {
	if (!state.form[action.payload['data'].id]
		|| typeof state.form[action.payload['data'].id] !== 'object'
		|| Array.isArray(state.form[action.payload['data'].id])) {
		state.form[action.payload['data'].id] = {
			loader: false,
			options: [],
			settins: [],
			errors: {},
		};
	}
	if (((typeof action.payload['data'].id === 'number'
			&& !Number.isNaN(action.payload['data'].id))
		|| (action.payload['data'].id
			&& typeof action.payload['data'].id === 'string'))) {
		state.form[action.payload['data'].id] = {
			...state.form[action.payload['data'].id],
			...(action.payload['data'] || {}),
		};
	}
	if (typeof action.payload['callback'] === 'function') {
		setTimeout(() => action.payload['callback'](action.payload['data'], action.payload['filesResponses'], state), 0);
	}
	return ({ ...state });
};
