
const tmp = {};

setInterval(() => {
	const tmpMemo = { ...tmp };
	let name,
		max = 0;

	for (name in tmpMemo) {
		if (max < 4) {
			tmpMemo[name]();
			delete tmp[name];
			
			max++;
		}
		else {
			break;
		}
	}
}, 1000);

export const fireFormCreateLoop = (name) => async (callback = () => {}) => {
	if (!tmp[name]) {
		tmp[name] = callback;
	}
};

export const fireFormDropLoop = (name) => {
	delete tmp[name];
};
