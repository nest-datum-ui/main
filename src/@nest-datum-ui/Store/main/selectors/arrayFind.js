import { 
	arr as utilsCheckArr,
	func as utilsCheckFunc, 
} from '@nest-datum-utils/check';
import extract from './extract.js';

const arrayFind = (path, callback) => extract(path, (state) => (utilsCheckArr(path) 
	&& utilsCheckFunc(callback)
	&& utilsCheckArr(state))
	? state.find(callback)
	: undefined);

export default arrayFind;
