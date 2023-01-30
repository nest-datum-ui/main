import withToken from './withToken.js';

const filesWithToken = () => withToken(`${process.env.SERVICE_FILES}/file`);

export default filesWithToken;
