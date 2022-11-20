import { fireFormProp as actionApiFormProp } from 'components/Store/api/actions/form/prop.js';
import { fireFormGet as actionApiFormGet } from 'components/Store/api/actions/form/get.js';
import { fireClose as actionDialogClose } from 'components/Store/dialog/actions/close.js';
import axios from 'axios';

let timeout1,
	timeout2,
	timeout3;
const onCreate = async ({
	value,
	gateway,
	id,
	path,
	enqueueSnackbar,
	setState,
}) => {
	clearTimeout(timeout1);

	timeout1 = setTimeout(async () => {
		setState((state) => ({
			...state,
			loader: true,
		}));
		clearTimeout(timeout2);

		timeout2 = setTimeout(async () => {
			let apiPath = '';

			try {
				apiPath = `${gateway}/folder?${new URLSearchParams({
					accessToken: localStorage.getItem(`${process.env.SITE_URL}_accessToken`),
				}).toString()}`;

				await actionApiFormProp(id, 'loader', true)();
				await axios.post(apiPath, { path: `${path}/${value}` });
				await actionApiFormGet({
					entityId: id,
					url: gateway,
					path: 'folder',
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

				enqueueSnackbar(`${errorMessage} - ${apiPath}`, { variant: 'error' });
				actionApiFormProp(id, 'loader', false)();
			}
			clearTimeout(timeout3);

			timeout3 = setTimeout(async () => {
				await actionDialogClose('storage-folder-create')();

				setState({
					loader: false,
					error: '',
					value: '',
				});
			}, 0);
		}, 1000);
	}, 0);
};

export default onCreate;
