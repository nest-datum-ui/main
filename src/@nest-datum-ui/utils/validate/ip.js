
const ip = (e, testFlag) => {
	if (testFlag) {
		return (e
			.split('.')
			.filter((item) => Number(item) >= 0 && Number(item) <= 255)).length === 4;
	}
	const target = e.target;

	if (target.value.includes('..')) {
		target.value = target.value.replace('..', '.');
	}
	if (target.value.includes('.')) {
		const blocks = target.value.split('.');

		target.value = ([ ...blocks ])
			.splice(0, 4)
			.map((item) => item === ''
				? item
				: (Number.isNaN(Number(item))
					? '0'
					: (Math.abs(Number(item)) > 255
						? '255'
						: Math.abs(Number(item)))))
			.join('.');
	}
	else if (Number.isNaN(Number(target.value))) {
		target.value = '0';
	}
	else if (target.value.includes('00')) {
		target.value = target.value.replace('00', '0');
	}
	else if (Math.abs(Number(target.value)) > 255) {
		target.value = '255';
	}
};

export default ip;
