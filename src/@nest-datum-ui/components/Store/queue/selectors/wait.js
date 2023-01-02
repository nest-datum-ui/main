import findArray from '@nest-datum-ui/components/Store/main/selectors/findArray.js';

const wait = (queueName, id) => findArray([ 'queue', queueName, 'loop' ], (item) => item === id);

export default wait;
