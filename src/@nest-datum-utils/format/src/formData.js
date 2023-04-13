import {
	arr as utilsCheckArr,
	objFileList as utilsObjFileList,
} from '@nest-datum-utils/check';

const formData = (data = {}) => {
	if (utilsCheckArr(data) || utilsObjFileList(data)) {
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
		if (data['parentId']) {
			formData.append('parentId', data['parentId']);
		}
		return formData;
	}
	return null;
};

export default formData;
