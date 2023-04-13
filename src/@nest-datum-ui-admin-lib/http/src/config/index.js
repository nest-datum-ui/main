import httpSetting from './setting.js';
import httpSettingForm from './settingForm.js';
import httpSettingList from './settingList.js';
import httpAccess from './access.js';
import httpAccessForm from './accessForm.js';
import httpAccessFormRelationList from './accessFormRelationList.js';
import httpAccessFormRelationForm from './accessFormRelationForm.js';
import httpAccessList from './accessList.js';
import httpAccessOption from './accessOption.js';
import httpAccessOptionRelationForm from './accessOptionRelationForm.js';
import httpAccessOptionRelationList from './accessOptionRelationList.js';
import httpAccessOptionForm from './accessOptionForm.js';
import httpAccessOptionList from './accessOptionList.js';
import httpAccessStatus from './accessStatus.js';
import httpAccessStatusForm from './accessStatusForm.js';
import httpAccessStatusList from './accessStatusList.js';

const config = {
	name: 'http',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'http',
	pageBaseUrl: 'http',
	pageInitialUrl: 'settings',
	apiBaseUrl: process.env.URL_API_HTTP,
	title: 'HTTP',
	
	httpSetting,
	httpSettingForm,
	httpSettingList,
	httpAccess,
	httpAccessForm,
	httpAccessFormRelationList,
	httpAccessFormRelationForm,
	httpAccessList,
	httpAccessOption,
	httpAccessOptionRelationForm,
	httpAccessOptionRelationList,
	httpAccessOptionForm,
	httpAccessOptionList,
	httpAccessStatus,
	httpAccessStatusForm,
	httpAccessStatusList,
};

export default config;
