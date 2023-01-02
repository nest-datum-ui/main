
const files = (path = '', withAccessToken = false) => {
	return (process.env.SERVICE_FILES + path) + (withAccessToken
		? `?accessToken=${localStorage.getItem(`${process.env.SERVICE_CURRENT}_accessToken`)}`
		: '');
};

export default files;
