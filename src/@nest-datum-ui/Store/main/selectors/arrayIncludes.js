import { arr as utilsCheckArr } from '@nest-datum-utils/check';
import extract from './extract.js';

const arrayIncludes = (path, ...values) => extract(path, (state) => (utilsCheckArr(path)
	&& utilsCheckArr(state))
	? state.includes(...values)
	: undefined);

export default arrayIncludes;
