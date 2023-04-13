import jobsSetting from './setting.js';
import jobsSettingForm from './settingForm.js';
import jobsSettingList from './settingList.js';
import jobsAccess from './access.js';
import jobsAccessForm from './accessForm.js';
import jobsAccessFormRelationList from './accessFormRelationList.js';
import jobsAccessFormRelationForm from './accessFormRelationForm.js';
import jobsAccessList from './accessList.js';
import jobsAccessOption from './accessOption.js';
import jobsAccessOptionRelationForm from './accessOptionRelationForm.js';
import jobsAccessOptionRelationList from './accessOptionRelationList.js';
import jobsAccessOptionForm from './accessOptionForm.js';
import jobsAccessOptionList from './accessOptionList.js';
import jobsAccessStatus from './accessStatus.js';
import jobsAccessStatusForm from './accessStatusForm.js';
import jobsAccessStatusList from './accessStatusList.js';
import jobsJob from './job.js';
import jobsJobForm from './jobForm.js';
import jobsJobFormRelationList from './jobFormRelationList.js';
import jobsJobFormRelationForm from './jobFormRelationForm.js';
import jobsJobList from './jobList.js';
import jobsJobOption from './jobOption.js';
import jobsJobOptionRelationForm from './jobOptionRelationForm.js';
import jobsJobOptionRelationList from './jobOptionRelationList.js';
import jobsJobOptionForm from './jobOptionForm.js';
import jobsJobOptionList from './jobOptionList.js';
import jobsJobStatus from './jobStatus.js';
import jobsJobStatusForm from './jobStatusForm.js';
import jobsJobStatusList from './jobStatusList.js';

const config = {
	name: 'jobs',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'jobs',
	pageBaseUrl: 'jobs',
	pageInitialUrl: 'jobs',
	apiBaseUrl: process.env.URL_API_JOBS,
	title: 'Jobs',
	
	jobsSetting,
	jobsSettingForm,
	jobsSettingList,
	jobsAccess,
	jobsAccessForm,
	jobsAccessFormRelationList,
	jobsAccessFormRelationForm,
	jobsAccessList,
	jobsAccessOption,
	jobsAccessOptionRelationForm,
	jobsAccessOptionRelationList,
	jobsAccessOptionForm,
	jobsAccessOptionList,
	jobsAccessStatus,
	jobsAccessStatusForm,
	jobsAccessStatusList,
	jobsJob,
	jobsJobForm,
	jobsJobFormRelationList,
	jobsJobFormRelationForm,
	jobsJobList,
	jobsJobOption,
	jobsJobOptionRelationForm,
	jobsJobOptionRelationList,
	jobsJobOptionForm,
	jobsJobOptionList,
	jobsJobStatus,
	jobsJobStatusForm,
	jobsJobStatusList,
};

export default config;
