
const files = (path = '', withAccessToken = false, accessToken = '') => {
	return ((path.indexOf('https://') === 0 || path.indexOf('http://') === 0) 
		&& !path.includes(process.env.SERVICE_FILES))
		? path
		: ((process.env.SERVICE_FILES + path) + (withAccessToken
			? `?accessToken=${accessToken || localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}`
			: ''));
};

export default files;
