import axios from 'axios';
import Store from '@nest-datum-ui/components/Store';
import utilsUrlWithToken from '@nest-datum-ui/utils/url/withToken.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';
import utilsConvertStrErr from '@nest-datum-ui/utils/convert/str/err.js';
import utilsConvertObjErr from '@nest-datum-ui/utils/convert/obj/err.js';
import { hookSnackbar } from '@nest-datum-ui/utils/hooks';
import { fireFormProp as actionApiFormProp } from './prop.js';
import { FILES_DATA_TYPE_UPLOAD } from '@nest-datum-ui-lib/files/consts/dataType.js';

export const fireFormCreateOptions = (storeFormNameOrUrl, options) => async (prefix = 'api') => {
	const snackbar = hookSnackbar();

	if (utilsCheckStrUrl(storeFormNameOrUrl)) {
		let url,
			storeFormName;

		if (utilsCheckObj(options)) {
			if (utilsCheckStr(options.path)) {
				url = options.path ?? storeFormNameOrUrl;
			}
			if (utilsCheckStrId(options.id)) {
				storeFormName = `${storeFormNameOrUrl}/${options.id}`;
			}
			else {
				storeFormName = storeFormNameOrUrl;
			}
		}
		else {
			storeFormName = (url = `${storeFormNameOrUrl}${options ? `/${utilsCheckStrId(options)}` : ''}`);
		}

		try {
			const data = (((Store()
				.getState()
				.api || {})
				.list || {})[storeFormName] || {})
				.data;

			if (utilsCheckArr(data) && data.length > 0) {
				await actionApiFormProp(storeFormName, 'loader', true)();

				let i = 0,
					ii = 0,
					payload = [],
					relationTableName,
					valueTableName;

				while (i < data.length) {
					const collector = [];
					const dataItem = data[i];

					if (!relationTableName
						|| !utilsCheckStr(relationTableName)) {
						relationTableName = Object
							.keys(dataItem)
							.find((key) => {
								const keySplit = key.split('Options');

								return utilsCheckArr(dataItem[key])
									&& keySplit.length >= 2
									&& keySplit[keySplit.length - 1] === '';
							});
					}
					if (!relationTableName
						|| !utilsCheckStr(relationTableName) 
						|| !utilsCheckArr(dataItem[relationTableName])
						|| !utilsCheckObj(dataItem[relationTableName][0])) {
						break;
					}
					const dataItemRelation = dataItem[relationTableName][0];

					if (!valueTableName
						|| !utilsCheckStr(valueTableName)) {
						valueTableName = Object
							.keys(dataItemRelation)
							.find((key) => {
								const keySplit = key.split('Options');

								return utilsCheckArr(dataItemRelation[key])
									&& keySplit.length >= 2
									&& keySplit[keySplit.length - 1] === '';
							});
					}
					if (!valueTableName
						|| !utilsCheckStr(valueTableName) 
						|| !utilsCheckArr(dataItemRelation[valueTableName])) {
						break;
					}
					if (data[i].dataTypeId === FILES_DATA_TYPE_UPLOAD) {
					}
					else {
						ii = 0;

						while (ii < dataItemRelation[valueTableName].length) {
							const dataItemValue = dataItemRelation[valueTableName][ii];

							collector.push({
								entityOptionId: dataItemValue.formFormOptionId,
								entityId: dataItemValue.formId,
								content: dataItemValue.content,
								id: dataItemValue.id,
							});
							ii++;
						}
						payload.push(collector);
					}
					i++;
				}
				if (payload.length > 0) {
					await axios.post(utilsUrlWithToken(url), payload);
				}
			}
		}
		catch (err) {
			snackbar(utilsConvertStrErr(utilsConvertObjErr(err), url), { variant: 'error' });
			actionApiFormProp(storeFormName, 'loader', false)();
		}
	}
};
