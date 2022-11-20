import { fireFormProp as actionApiFormProp } from 'components/Store/api/actions/form/prop.js';
import { fireFormGet as actionApiFormGet } from 'components/Store/api/actions/form/get.js';
import axios from 'axios';

let timeout;
const onUpload = async (e, gateway, folder, enqueueSnackbar = () => {}) => {
	let apiPath = '';
	
	try {
		await actionApiFormProp(folder.id, 'loader', true)();

		if (e.target.files.length > 0
			&& folder
			&& typeof folder.path === 'string'
			&& gateway) {
			const formData = new FormData();
			let i = 0;

			apiPath = `${gateway}/file?${new URLSearchParams({
				accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`),
			}).toString()}`;

			while (i < e.target.files.length) {
				formData.append('files', e.target.files[i]);
				i++;
			}
			formData.append('path', folder.path);

			await axios.post(apiPath, formData);
			
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				actionApiFormGet({
					entityId: folder.id,
					url: gateway,
					path: 'folder',
					withAccessToken: true,
				})(enqueueSnackbar);
			}, 0);
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

		enqueueSnackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
		actionApiFormProp(folder.id, 'loader', false)();
	}
};

export default onUpload;
