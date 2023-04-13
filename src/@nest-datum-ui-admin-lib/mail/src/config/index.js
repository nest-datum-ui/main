import mailSetting from './setting.js';
import mailSettingForm from './settingForm.js';
import mailSettingList from './settingList.js';
import mailAccess from './access.js';
import mailAccessForm from './accessForm.js';
import mailAccessFormRelationList from './accessFormRelationList.js';
import mailAccessFormRelationForm from './accessFormRelationForm.js';
import mailAccessList from './accessList.js';
import mailAccessOption from './accessOption.js';
import mailAccessOptionRelationForm from './accessOptionRelationForm.js';
import mailAccessOptionRelationList from './accessOptionRelationList.js';
import mailAccessOptionForm from './accessOptionForm.js';
import mailAccessOptionList from './accessOptionList.js';
import mailAccessStatus from './accessStatus.js';
import mailAccessStatusForm from './accessStatusForm.js';
import mailAccessStatusList from './accessStatusList.js';
import mailLetter from './letter.js';
import mailLetterForm from './letterForm.js';
import mailLetterFormRelationList from './letterFormRelationList.js';
import mailLetterFormRelationForm from './letterFormRelationForm.js';
import mailLetterList from './letterList.js';
import mailLetterOption from './letterOption.js';
import mailLetterOptionRelationForm from './letterOptionRelationForm.js';
import mailLetterOptionRelationList from './letterOptionRelationList.js';
import mailLetterOptionForm from './letterOptionForm.js';
import mailLetterOptionList from './letterOptionList.js';
import mailLetterStatus from './letterStatus.js';
import mailLetterStatusForm from './letterStatusForm.js';
import mailLetterStatusList from './letterStatusList.js';
import mailTemplate from './template.js';
import mailTemplateForm from './templateForm.js';
import mailTemplateFormRelationList from './templateFormRelationList.js';
import mailTemplateFormRelationForm from './templateFormRelationForm.js';
import mailTemplateList from './templateList.js';
import mailTemplateOption from './templateOption.js';
import mailTemplateOptionRelationForm from './templateOptionRelationForm.js';
import mailTemplateOptionRelationList from './templateOptionRelationList.js';
import mailTemplateOptionForm from './templateOptionForm.js';
import mailTemplateOptionList from './templateOptionList.js';
import mailTemplateStatus from './templateStatus.js';
import mailTemplateStatusForm from './templateStatusForm.js';
import mailTemplateStatusList from './templateStatusList.js';
import mailReport from './report.js';
import mailReportList from './reportList.js';
import mailReportStatus from './reportStatus.js';
import mailReportStatusForm from './reportStatusForm.js';
import mailReportStatusList from './reportStatusList.js';

const config = {
	name: 'mail',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'mail',
	pageBaseUrl: 'mail',
	pageInitialUrl: 'letters',
	apiBaseUrl: process.env.URL_API_MAIL,
	title: 'Mail',
	
	mailSetting,
	mailSettingForm,
	mailSettingList,
	mailAccess,
	mailAccessForm,
	mailAccessFormRelationList,
	mailAccessFormRelationForm,
	mailAccessList,
	mailAccessOption,
	mailAccessOptionRelationForm,
	mailAccessOptionRelationList,
	mailAccessOptionForm,
	mailAccessOptionList,
	mailAccessStatus,
	mailAccessStatusForm,
	mailAccessStatusList,
	mailLetter,
	mailLetterForm,
	mailLetterFormRelationList,
	mailLetterFormRelationForm,
	mailLetterList,
	mailLetterOption,
	mailLetterOptionRelationForm,
	mailLetterOptionRelationList,
	mailLetterOptionForm,
	mailLetterOptionList,
	mailLetterStatus,
	mailLetterStatusForm,
	mailLetterStatusList,
	mailTemplate,
	mailTemplateForm,
	mailTemplateFormRelationList,
	mailTemplateFormRelationForm,
	mailTemplateList,
	mailTemplateOption,
	mailTemplateOptionRelationForm,
	mailTemplateOptionRelationList,
	mailTemplateOptionForm,
	mailTemplateOptionList,
	mailTemplateStatus,
	mailTemplateStatusForm,
	mailTemplateStatusList,
	mailReport,
	mailReportList,
	mailReportStatus,
	mailReportStatusForm,
	mailReportStatusList,
};

export default config;
