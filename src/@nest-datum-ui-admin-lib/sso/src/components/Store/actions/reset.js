import axios from 'axios';
import {
	strPassword as utilsCheckStrPassword,
	strFilled as utilsCheckStrFilled,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	hookUrlProperty,
	hookSnackbar, 
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';

export const fireReset = async (storeName, apiUrl) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const verifyKey = hookUrlProperty('verifyKey');
		
		if (!utilsCheckStrFilled(verifyKey)) {
			hookSnackbar(`Verify key is empty.`);

			return actionApiFormProp(storeName, 'loader', false)();
		}
		const {
			password,
			repeatedPassword,
		} = await utilsValidateStore(storeName, {
			password: {
				text: 'Password not specified.',
				check: [
					utilsCheckStrPassword,
				],
			},
			repeatedPassword: {
				text: 'Passwords do not match.',
				check: [
					utilsCheckStrPassword,
					(repeatedPassword, all) => repeatedPassword === all['password'],
				],
			},
		});

		if (password && repeatedPassword) {
			await axios.post(apiUrl, { password, repeatedPassword, verifyKey });

			actionApiFormClear(storeName, { successfulPasswordChangeFlag: true })();
		}
	}
	catch (err) {
		actionApiFormClear(storeName)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
