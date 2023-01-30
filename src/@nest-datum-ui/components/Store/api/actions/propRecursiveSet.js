import utilsCheckObj from '@nest-datum-ui/utils/check/obj';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

const propRecursiveSet = (state = {}, payload = {}) => {
	const storeName = (payload || {}).storeFormName ?? (payload || {}).storeListName;
	let target = ((state || {})[storeName] || {})[(payload || {}).propName],
		i = 0;

	if (utilsCheckObj(target) || utilsCheckArr(target)) {
		if (((payload || {}).path || []).length >= 2) {
			while (i < payload.path.length - 2) {
				target = target[payload.path[i]];
				i++;
			}
			target[payload.path[payload.path.length - 2]][payload.path[payload.path.length - 1]] = payload.propValue;
		}
		else if (((payload || {}).path || []).length === 1) {
			target[payload.path[payload.path.length - 1]] = (payload || {}).propValue;
		}
		state[storeName][payload.propName] = utilsCheckArr(state[storeName][payload.propName])
			? ([ ...state[storeName][payload.propName] ])
			: ({ ...state[storeName][payload.propName] });
	}
	return state;
};

export default propRecursiveSet;
