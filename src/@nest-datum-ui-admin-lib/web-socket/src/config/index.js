import webSocketSetting from './setting.js';
import webSocketSettingForm from './settingForm.js';
import webSocketSettingList from './settingList.js';
import webSocketAccess from './access.js';
import webSocketAccessForm from './accessForm.js';
import webSocketAccessFormRelationList from './accessFormRelationList.js';
import webSocketAccessFormRelationForm from './accessFormRelationForm.js';
import webSocketAccessList from './accessList.js';
import webSocketAccessOption from './accessOption.js';
import webSocketAccessOptionRelationForm from './accessOptionRelationForm.js';
import webSocketAccessOptionRelationList from './accessOptionRelationList.js';
import webSocketAccessOptionForm from './accessOptionForm.js';
import webSocketAccessOptionList from './accessOptionList.js';
import webSocketAccessStatus from './accessStatus.js';
import webSocketAccessStatusForm from './accessStatusForm.js';
import webSocketAccessStatusList from './accessStatusList.js';

const config = {
	name: 'web-socket',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'web-socket',
	pageBaseUrl: 'web-socket',
	pageInitialUrl: 'settings',
	apiBaseUrl: process.env.URL_API_WEB_SOCKET,
	title: 'Web Socket',
	
	webSocketSetting,
	webSocketSettingForm,
	webSocketSettingList,
	webSocketAccess,
	webSocketAccessForm,
	webSocketAccessFormRelationList,
	webSocketAccessFormRelationForm,
	webSocketAccessList,
	webSocketAccessOption,
	webSocketAccessOptionRelationForm,
	webSocketAccessOptionRelationList,
	webSocketAccessOptionForm,
	webSocketAccessOptionList,
	webSocketAccessStatus,
	webSocketAccessStatusForm,
	webSocketAccessStatusList,
};

export default config;
