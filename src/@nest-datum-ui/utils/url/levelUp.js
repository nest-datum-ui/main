
const levelUp = (pathname) => {
	const pathnameSplit = (pathname ?? window.location.pathname).split('/');

	pathnameSplit.splice(pathnameSplit.length - 1, 1);

	return pathnameSplit.join('/');
};

export default levelUp;
