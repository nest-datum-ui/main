import extract from '@nest-datum-ui/components/Store/main/selectors/extract.js';

const now = (queueName) => extract([ 'queue', queueName, 'now' ]);

export default now;
