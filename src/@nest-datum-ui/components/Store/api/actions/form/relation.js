import Store from '@nest-datum-ui/components/Store';
import { fireFormClear as actionApiFormClear } from '@nest-datum-ui/components/Store/api/actions/form/clear.js';
import { fireFormProp as actionApiFormProp } from '@nest-datum-ui/components/Store/api/actions/form/prop.js';
import { fireListProp as actionApiListProp } from '@nest-datum-ui/components/Store/api/actions/list/prop.js';
import { fireFormCreate as actionApiFormCreate } from '@nest-datum-ui/components/Store/api/actions/form/create.js';
import { fireClose as actionDialogClose } from '@nest-datum-ui/components/Store/dialog/actions/close.js';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';
import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';
import utilsCheckStrUrl from '@nest-datum-ui/utils/check/str/url.js';

export const fireFormRelation = (storeFormNameOrUrl, e) => async (options) => {
	e.preventDefault();

	let storeListName,
		columnName,
		path;

	if (utilsCheckObj(options)) {
		if (utilsCheckStr(options.storeListName)) {
			storeListName = options.storeListName;
		}
		if (utilsCheckStrId(options.columnName)) {
			columnName = options.columnName;
		}
		if (utilsCheckStrUrl(options.path)) {
			path = options.path;
		}
	}
	if (storeListName
		&& columnName
		&& path) {
		await actionApiFormProp(storeFormNameOrUrl, 'loader', true)();
		// await actionApiListProp(storeListName, 'loader', true)();

		const columnValue = (((Store()
			.getState()
			.api || {})
			.form || {})[storeFormNameOrUrl] || {})[columnName];
		const errors = {};

		!utilsCheckStrId(columnValue)
			&& (errors[columnName] = 'The value is in the wrong format.');

		if (Object.keys(errors).length > 0) {
			await actionApiFormProp(storeFormNameOrUrl, 'errors', errors)();
			await actionApiFormProp(storeFormNameOrUrl, 'loader', false)();
		}
		await actionApiFormCreate(storeFormNameOrUrl, { path, notRedirect: true })();

		const userId = (Store()
			.getState()
			.auth || {})
			.id;
		const formData = ((Store()
			.getState()
			.api || {})
			.form || {})[storeFormNameOrUrl] || {};
		const listData = (((Store()
			.getState()
			.api || {})
			.list || {})[storeListName] || {})
			.data;

		if (utilsCheckArr(listData)) {
			listData.unshift({ 
				...formData,
				userId,
			});

			await actionApiListProp(storeListName, 'data', [ ...listData ])();
		}
		// await actionApiListProp(storeListName, 'loader', false)();
	}
	await actionApiFormClear(storeFormNameOrUrl)();
	await actionDialogClose(storeFormNameOrUrl)();
};
