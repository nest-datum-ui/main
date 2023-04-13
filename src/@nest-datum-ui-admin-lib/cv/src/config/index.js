import cvSetting from './setting.js';
import cvSettingForm from './settingForm.js';
import cvSettingList from './settingList.js';
import cvAccess from './access.js';
import cvAccessForm from './accessForm.js';
import cvAccessFormRelationList from './accessFormRelationList.js';
import cvAccessFormRelationForm from './accessFormRelationForm.js';
import cvAccessList from './accessList.js';
import cvAccessOption from './accessOption.js';
import cvAccessOptionRelationForm from './accessOptionRelationForm.js';
import cvAccessOptionRelationList from './accessOptionRelationList.js';
import cvAccessOptionForm from './accessOptionForm.js';
import cvAccessOptionList from './accessOptionList.js';
import cvAccessStatus from './accessStatus.js';
import cvAccessStatusForm from './accessStatusForm.js';
import cvAccessStatusList from './accessStatusList.js';
import cvReport from './report.js';
import cvReportList from './reportList.js';
import cvReportForm from './reportForm.js';
import cvReportStatus from './reportStatus.js';
import cvReportStatusForm from './reportStatusForm.js';
import cvReportStatusList from './reportStatusList.js';

const config = {
	name: 'cv',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'cv',
	pageBaseUrl: 'cv',
	pageInitialUrl: 'reports',
	apiBaseUrl: process.env.URL_API_CV,
	title: 'CV',
	
	cvSetting,
	cvSettingForm,
	cvSettingList,
	cvAccess,
	cvAccessForm,
	cvAccessFormRelationList,
	cvAccessFormRelationForm,
	cvAccessList,
	cvAccessOption,
	cvAccessOptionRelationForm,
	cvAccessOptionRelationList,
	cvAccessOptionForm,
	cvAccessOptionList,
	cvAccessStatus,
	cvAccessStatusForm,
	cvAccessStatusList,
	cvReport,
	cvReportList,
	cvReportForm,
	cvReportStatus,
	cvReportStatusForm,
	cvReportStatusList,
};

export default config;
