import utilsCheckObj from './index.js';

const fileList = (value) => utilsCheckObj(value) && value.constructor.name === 'FileList';

export default fileList;
