import axios from 'axios';
import utilsCheckObjFileList from '@nest-datum-ui/utils/check/obj/fileList.js';
import utilsConvertFilesFormData from '@nest-datum-ui/utils/convert/files/formData.js';
import utilsUrlFilesWithToken from '@nest-datum-ui/utils/url/filesWithToken.js';

export const fireFormCreateFile = (data) => async (prefix = 'api') => {
	let key,
		filesResponses = [];

	for (key in data) {
		if (utilsCheckObjFileList(data[key])) {
			const formData = utilsConvertFilesFormData(data[key]);
			const request = await axios.post(utilsUrlFilesWithToken(), formData);

			filesResponses.push(request.data);
			data[key] = request.data[0]['id'];
		}
	}
	return {
		formData: data,
		filesResponses,
	};
};
