import { arr as utilsCheckArr } from '@nest-datum-utils/check';
import extract from './extract.js';

const arrayIsArray = (path = []) => extract(path, (state) => utilsCheckArr(state));

export default arrayIsArray;
