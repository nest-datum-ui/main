
const hookLastPathItem = (pathname) => {
	const pathnameSplit = (pathname ?? window.location.pathname)
		.replace(/\/+$/, '')
		.split('/');

	return pathnameSplit[pathnameSplit.length - 1];
};

export default hookLastPathItem;
