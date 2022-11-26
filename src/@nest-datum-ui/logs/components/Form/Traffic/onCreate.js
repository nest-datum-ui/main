import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireFormUpdate as actionApiFormUpdate } from '@nest-datum-ui/components/Store/api/actions/form/update.js';
import Store from '@nest-datum-ui/components/Store';
import validateStr from '@nest-datum-ui/utils/validate/str.js';
import validateNotEmpty from '@nest-datum-ui/utils/validate/notEmpty.js';
import validateStrJson from '@nest-datum-ui/utils/validate/strJson.js';
import validateIp from '@nest-datum-ui/utils/validate/ip.js';

const onCreate = async ({
	entityId, 
	enqueueSnackbar,
	navigate,
}) => {
	try {
		await actionApiFormProp(entityId, 'loader', true)();

		const {
			id,
			servId,
			replica,
			ipAddr,
			referrer,
			method,
			route,
			headers,
			cookies,
			queries,
			body,
		} = Store().getState()['api'].form[entityId];
		const errors = {};

		if (!validateStr(id, true)) {
			errors['id'] = 'The value is in the wrong format.';
		}
		if (!validateStr(servId)) {
			errors['servId'] = 'The value is in the wrong format.';
		}
		if (!validateStr(replica)) {
			errors['replica'] = 'The value is in the wrong format.';
		}
		if (!validateIp(ipAddr, true)) {
			errors['ipAddr'] = 'The value is in the wrong format.';
		}
		else if (!validateNotEmpty(ipAddr)) {
			errors['ipAddr'] = 'Cannot be empty.';
		}
		if (!validateStr(referrer)) {
			errors['referrer'] = 'The value is in the wrong format.';
		}
		if (!validateStr(method)) {
			errors['method'] = 'The value is in the wrong format.';
		}
		if (!validateStr(route)) {
			errors['route'] = 'The value is in the wrong format.';
		}
		if (!validateStrJson(headers)) {
			errors['headers'] = 'The value is in the wrong format.';
		}
		if (!validateStrJson(cookies, true)) {
			errors['cookies'] = 'The value is in the wrong format.';
		}
		if (!validateStrJson(queries, true)) {
			errors['queries'] = 'The value is in the wrong format.';
		}
		if (!validateStrJson(body, true)) {
			errors['body'] = 'The value is in the wrong format.';
		}
		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(entityId, 'errors', errors)();
			await actionApiFormProp(entityId, 'loader', false)();

			throw new Error('Check that the form is filled out correctly.');
		}

		(entityId === '0')
			? actionApiFormCreate({
				entityId,
				url: process.env.SERVICE_LOGS,
				path: 'traffic',
				withAccessToken: true,
			})(enqueueSnackbar, navigate)
			: actionApiFormUpdate({
				entityId,
				url: process.env.SERVICE_LOGS,
				path: 'traffic',
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
