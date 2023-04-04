import {
	arr as utilsCheckArr,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';

const objMergeRec = (data = {}, payload = {}) => {
	let i = 0;

	if (utilsCheckObj(data) || utilsCheckArr(data)) {
		if (((payload || {}).propName || []).length >= 1) {
			let target = data;

			while (i < payload.propName.length - 1) {
				target = target[payload.propName[i]];
				i++;
			}
			target[payload.propName[payload.propName.length - 1]] = payload.propValue;
		}
	}
	return data;
};

export default objMergeRec;
