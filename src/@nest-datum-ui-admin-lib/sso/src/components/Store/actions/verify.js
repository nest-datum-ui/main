import axios from 'axios';
import { strFilled as utilsCheckStrFilled } from '@nest-datum-utils/check';
import { httpErrorMessage as utilsFormatHttpErrorMessage } from '@nest-datum-utils/format';
import { 
	hookUrlProperty,
	actionApiFormClear,
	actionApiFormProp,
} from '@nest-datum-ui/Store';

export const fireVerify = async (storeName, apiUrl) => {
	try {
		actionApiFormProp(storeName, 'loader', true)();

		const verifyKey = hookUrlProperty('verifyKey');
		
		if (!utilsCheckStrFilled(verifyKey)) {
			throw new Error(`Verify key is empty.`);
		}
		if (verifyKey) {
			const request = await axios.post(apiUrl, { verifyKey });

			if (!request.data.message) {
				throw new Error(`An error has occurred. Received an empty response when trying to activate an account. The account may not be configured correctly.`);
			}
			actionApiFormClear(storeName, { resultMessage: request.data.message })();

			return true;
		}
	}
	catch (err) {
		const errMessage = utilsFormatHttpErrorMessage(err, apiUrl);

		actionApiFormClear(storeName, { resultMessage: errMessage })();

		throw new Error(errMessage);
	}
	return false;
};
