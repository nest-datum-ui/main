import johnConnorManager from './manager.js';
import johnConnorManagerList from './managerList.js';
import johnConnorDescriptionList from './descriptionList.js';
import johnConnorDescriptionForm from './descriptionForm.js';
import johnConnorValueForm from './valueForm.js';

const config = {
	name: 'john-connor',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'john-connor',
	pageBaseUrl: 'john-connor',
	pageInitialUrl: 'manager',
	apiBaseUrl: process.env.URL_API_JOHN_CONNOR,
	title: 'John Connor',
	
	johnConnorManager,
	johnConnorManagerList,
	johnConnorDescriptionList,
	johnConnorDescriptionForm,
	johnConnorValueForm,
};

export default config;
