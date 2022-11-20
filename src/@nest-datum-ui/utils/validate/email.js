
const email = (e, testFlag) => {
	if (testFlag) {
		return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e));
	}	
	const target = e.target;

	if (typeof target !== 'undefined') {
		target.value = target.value.replace(/[^a-zа-я0-9.@_-]+/g, '');
	}
};

export default email;

