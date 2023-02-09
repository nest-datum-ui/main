import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckFileList from '@nest-datum-ui/utils/check/file/list.js';

const formData = (data = {}) => {
	if (utilsCheckArr(data) || utilsCheckFileList(data)) {
		const formData = new FormData();
		let i = 0;

		while (i < data.length) {
			formData.append('files', data[i]);
			i++;
		}
		if (data['systemId']) {
			formData.append('systemId', data['systemId']);
		}
		if (data['path']) {
			formData.append('path', data['path']);
		}
		return formData;
	}
	return null;
};

export default formData;
