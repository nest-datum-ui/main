import axios from 'axios';
import {
	strPassword as utilsCheckStrPassword,
	strUserName as utilsCheckStrUserName,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { store as utilsValidateStore } from '@nest-datum-utils/validate';
import { 
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';

export const fireRegister = async (storeName, apiUrl) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const {
			login,
			firstname,
			lastname,
			email,
			password,
			repeatedPassword,
		} = await utilsValidateStore(storeName, {
			login: {
				text: 'Login is not valid.',
				check: [ utilsCheckStrUserName ],
			},
			email: {
				text: 'Email is not valid.',
				check: [ utilsCheckStrEmail ],
			},
			firstname: {
				text: 'First name is not valid.',
				check: [ utilsCheckStrUserName ],
			},
			lastname: {
				text: 'Last name is not valid.',
				check: [ utilsCheckStrUserName ],
			},
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

		if (login 
			&& firstname
			&& lastname
			&& email
			&& password
			&& repeatedPassword) {
			await axios.post(apiUrl, {
				login,
				firstname,
				lastname,
				email,
				password,
				repeatedPassword,
			});

			actionApiFormClear(storeName, { successfulRegistrationFlag: true })();
		}
	}
	catch (err) {
		actionApiFormClear(storeName)();

		throw new Error(utilsFormatHttpErrorMessage(err, apiUrl));
	}
};
