
const httpNotFound = (err) => (err || {}).response && ((err.response || {}).status === 404
	|| (err.response || {}).status === 403);

export default httpNotFound;
