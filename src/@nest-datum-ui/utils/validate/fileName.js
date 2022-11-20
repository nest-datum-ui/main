
const fileName = (e) => {
	if (e.target.value.includes('/')
		|| e.target.value[0] === '.') {
		return false;
	}
	return true;
};

export default fileName;

