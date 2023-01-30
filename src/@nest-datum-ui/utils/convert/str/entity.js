import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckStr from '@nest-datum-ui/utils/check/str';

const entity = (complexEntityName = '') => {
	const complexEntityNameMatch = complexEntityName.match(/[A-Z][a-z]+/g);

	if (utilsCheckArr(complexEntityNameMatch)) {
		const complexEntityNameSplit = complexEntityName.split(complexEntityNameMatch.join(''));

		if (complexEntityNameSplit.length === 2
			&& !complexEntityNameSplit[1]
			&& utilsCheckStr(complexEntityNameSplit[0])) {
			return complexEntityNameSplit[0];
		}
	}
	return '';
};

export default entity;
