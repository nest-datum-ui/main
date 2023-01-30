import utilsCheckStrId from '@nest-datum-ui/utils/check/str/id.js';

const exists = (value) => utilsCheckStrId(value) && value !== '0';

export default exists;
