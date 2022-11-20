import findArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';

const extractByKey = (listName, key) => findArray([ 'api', 'list', listName, 'data' ], (item) => item.uniqueKey === key);

export default extractByKey;
