import axios from 'axios';
import { objFileList as utilsCheckObjFileList } from '@nest-datum-utils/check';
import { 
	urlFilesApiStr as utilsFormatUrlFilesApiStr,
	formData as utilsFormatFormData, 
} from '@nest-datum-utils/format';

export const fireFormCreateFile = (data) => async (prefix = 'api') => {
	let key,
		filesResponses = [];

	for (key in data) {
		if (utilsCheckObjFileList(data[key])) {
			const formData = utilsFormatFormData(data[key]);
			const request = await axios.post(utilsFormatUrlFilesApiStr(), formData);

			filesResponses.push(request.data);
			data[key] = request.data[0]['id'];
		}
	}
	return {
		formData: data,
		filesResponses,
	};
};
