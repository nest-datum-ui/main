import utilsCheckObjFilled from '@nest-datum-ui/utils/check/obj/filled.js';

const list = (value) => utilsCheckObjFilled(value) && value.constructor.name === 'FileList';

export default list;
