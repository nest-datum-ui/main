import lensaSetting from './setting.js';
import lensaSettingForm from './settingForm.js';
import lensaSettingList from './settingList.js';
import lensaAccess from './access.js';
import lensaAccessForm from './accessForm.js';
import lensaAccessFormRelationList from './accessFormRelationList.js';
import lensaAccessFormRelationForm from './accessFormRelationForm.js';
import lensaAccessList from './accessList.js';
import lensaAccessOption from './accessOption.js';
import lensaAccessOptionRelationForm from './accessOptionRelationForm.js';
import lensaAccessOptionRelationList from './accessOptionRelationList.js';
import lensaAccessOptionForm from './accessOptionForm.js';
import lensaAccessOptionList from './accessOptionList.js';
import lensaAccessStatus from './accessStatus.js';
import lensaAccessStatusForm from './accessStatusForm.js';
import lensaAccessStatusList from './accessStatusList.js';
import lensaReport from './report.js';
import lensaReportList from './reportList.js';
import lensaReportForm from './reportForm.js';
import lensaReportStatus from './reportStatus.js';
import lensaReportStatusForm from './reportStatusForm.js';
import lensaReportStatusList from './reportStatusList.js';

const config = {
	name: 'lensa',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'lensa',
	pageBaseUrl: 'lensa',
	pageInitialUrl: 'reports',
	apiBaseUrl: process.env.URL_API_LENSA,
	title: 'lensa',
	
	lensaSetting,
	lensaSettingForm,
	lensaSettingList,
	lensaAccess,
	lensaAccessForm,
	lensaAccessFormRelationList,
	lensaAccessFormRelationForm,
	lensaAccessList,
	lensaAccessOption,
	lensaAccessOptionRelationForm,
	lensaAccessOptionRelationList,
	lensaAccessOptionForm,
	lensaAccessOptionList,
	lensaAccessStatus,
	lensaAccessStatusForm,
	lensaAccessStatusList,
	lensaReport,
	lensaReportList,
	lensaReportForm,
	lensaReportStatus,
	lensaReportStatusForm,
	lensaReportStatusList,
};

export default config;
