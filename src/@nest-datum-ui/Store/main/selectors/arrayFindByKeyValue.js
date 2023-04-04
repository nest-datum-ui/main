import { obj as utilsCheckObj } from '@nest-datum-utils/check';
import arrayFind from './arrayFind.js';

const arrayFindByKeyValue = (path = [], key, value) => arrayFind(path, (item) => utilsCheckObj(item) && item[key] === value);

export default arrayFindByKeyValue;
