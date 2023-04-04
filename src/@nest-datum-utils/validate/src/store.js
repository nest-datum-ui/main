import Store, {
	actionApiFormClear,
} from '@nest-datum-ui/Store';
import { 
	str as utilsCheckStr,
	obj as utilsCheckObj,
	arr as utilsCheckArr, 
	exists as utilsCheckExists,
} from '@nest-datum-utils/check';

/**
 * errorStrategy: data | immediate | combine
 */
const store = async (storeName, fields = {}, options = { errorStrategy: 'data' }) => {
	const data = { ...((Store()
		.getState()
		.api
		.form || {})[storeName] || {}) };
	let fieldName,
		output = {};

	if (!utilsCheckObj(data['errors'])) {
		data['errors'] = {};
	}
	for (fieldName in fields) {
		const value = data[fieldName];
		let i = 0

		if (utilsCheckArr(fields[fieldName])) {
			while (i < fields[fieldName].length) {
				let ii = 0,
					checks = fields[fieldName][i]['check'],
					checkKey = 'check',
					isRequired = !!fields[fieldName][i]['isRequired'],
					result = {
						check: [],
						checkOr: [],
					};

				if (utilsCheckArr(fields[fieldName][i]['checkOr'])) {
					checks = fields[fieldName][i]['checkOr'];
					checkKey = 'checkOr'
				}
				while (ii < checks.length) {
					if (isRequired || (utilsCheckExists(value) && (utilsCheckStr(value) ? value.length > 0 : true))) {
						result[checkKey].push(await checks[ii](value, fieldName, data));
					}
					ii++;
				}
				if ((checkKey === 'checkOr' 
					&& !result[checkKey].includes(true))
					|| result['check'].includes(false)) {
					
					if (options['errorStrategy'] === 'immediate') {
						const err = new Error(String(fields[fieldName][i].text));

						err['MessageComponent'] = fields[fieldName][i].text;
						throw err;
					}
					data.errors[fieldName] = fields[fieldName][i].text;
				}
				else {
					output[fieldName] = value;
				}
				i++;
			}
			i = 0;
		}
		else {
			let checks = fields[fieldName]['check'],
				checkKey = 'check',
				isRequired = !!fields[fieldName]['isRequired'],
				result = {
					check: [],
					checkOr: [],
				};

			if (utilsCheckArr(fields[fieldName]['checkOr'])) {
				checks = fields[fieldName]['checkOr'];
				checkKey = 'checkOr'
			}
			while (i < checks.length) {
				if (isRequired || (utilsCheckExists(value) && (utilsCheckStr(value) ? value.length > 0 : true))) {
					result[checkKey].push(await checks[i](value, fieldName, data));
				}
				i++;
			}
			if (result[checkKey].length > 0
				&& ((checkKey === 'checkOr' && !result[checkKey].includes(true))
					|| result['check'].includes(false))) {
				if ((options['errorStrategy'] || {})['immediate']) {
					const err = new Error(String(fields[fieldName].text));

					err['MessageComponent'] = fields[fieldName].text;
					throw err;
				}
				data.errors[fieldName] = fields[fieldName].text;
			}
			else {
				output[fieldName] = value;
			}
		}
	}
	const dataErrorsKeys = Object.keys(data.errors || {});

	if (dataErrorsKeys.length > 0) {
		actionApiFormClear(storeName, { ...data })();

		if (options['errorStrategy'] === 'combine') {
			const err = new Error(String(data.errors[dataErrorsKeys[0]]));

			err['MessageComponent'] = data.errors[dataErrorsKeys[0]];
			throw err;
		}
		return null;
	}
	return output;
};

export default store;
