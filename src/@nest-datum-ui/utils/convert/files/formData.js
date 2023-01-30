import utilsCheckArr from '@nest-datum-ui/utils/check/arr';

const formData = (data = {}) => {
	if (utilsCheckArr(data)) {
		const formData = new FormData();
		let i = 0;

		while (i < data.length) {
			formData.append('files', data[i]);
			i++;
		}
		formData.append('systemId', data['systemId']);
		formData.append('path', data['path']);

		return formData;
	}
	return null;
};

export default formData;
