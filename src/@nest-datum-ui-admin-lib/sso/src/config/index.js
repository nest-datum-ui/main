import ssoSignIn from './signIn.js';
import ssoSignUp from './signUp.js';
import ssoRecovery from './recovery.js';
import ssoReset from './reset.js';
import ssoVerify from './verify.js';
import ssoSetting from './setting.js';
import ssoSettingForm from './settingForm.js';
import ssoSettingList from './settingList.js';
import ssoAccess from './access.js';
import ssoAccessForm from './accessForm.js';
import ssoAccessFormRelationList from './accessFormRelationList.js';
import ssoAccessFormRelationForm from './accessFormRelationForm.js';
import ssoAccessList from './accessList.js';
import ssoAccessOption from './accessOption.js';
import ssoAccessOptionRelationForm from './accessOptionRelationForm.js';
import ssoAccessOptionRelationList from './accessOptionRelationList.js';
import ssoAccessOptionForm from './accessOptionForm.js';
import ssoAccessOptionList from './accessOptionList.js';
import ssoAccessStatus from './accessStatus.js';
import ssoAccessStatusForm from './accessStatusForm.js';
import ssoAccessStatusList from './accessStatusList.js';
import ssoUser from './user.js';
import ssoUserForm from './userForm.js';
import ssoUserList from './userList.js';
import ssoUserOption from './userOption.js';
import ssoUserOptionForm from './userOptionForm.js';
import ssoUserOptionList from './userOptionList.js';
import ssoUserStatus from './userStatus.js';
import ssoUserStatusForm from './userStatusForm.js';
import ssoUserStatusList from './userStatusList.js';
import ssoRole from './role.js';
import ssoRoleForm from './roleForm.js';
import ssoRoleFormRelationList from './roleFormRelationList.js';
import ssoRoleFormRelationForm from './roleFormRelationForm.js';
import ssoRoleList from './roleList.js';
import ssoRoleOption from './roleOption.js';
import ssoRoleOptionRelationForm from './roleOptionRelationForm.js';
import ssoRoleOptionRelationList from './roleOptionRelationList.js';
import ssoRoleOptionForm from './roleOptionForm.js';
import ssoRoleOptionList from './roleOptionList.js';
import ssoRoleStatus from './roleStatus.js';
import ssoRoleStatusForm from './roleStatusForm.js';
import ssoRoleStatusList from './roleStatusList.js';

const config = {
	name: 'sso',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'sso',
	pageBaseUrl: 'sso',
	pageInitialUrl: 'users',
	apiBaseUrl: process.env.URL_API_SSO,
	apiRefreshUrl: process.env.URL_API_SSO +'/user/refresh',
	title: 'SSO',
	
	ssoSignIn,
	ssoSignUp,
	ssoRecovery,
	ssoReset,
	ssoVerify,
	ssoSetting,
	ssoSettingForm,
	ssoSettingList,
	ssoAccess,
	ssoAccessForm,
	ssoAccessFormRelationList,
	ssoAccessFormRelationForm,
	ssoAccessList,
	ssoAccessOption,
	ssoAccessOptionRelationForm,
	ssoAccessOptionRelationList,
	ssoAccessOptionForm,
	ssoAccessOptionList,
	ssoAccessStatus,
	ssoAccessStatusForm,
	ssoAccessStatusList,
	ssoUser,
	ssoUserForm,
	ssoUserList,
	ssoUserOption,
	ssoUserOptionForm,
	ssoUserOptionList,
	ssoUserStatus,
	ssoUserStatusForm,
	ssoUserStatusList,
	ssoRole,
	ssoRoleForm,
	ssoRoleFormRelationList,
	ssoRoleFormRelationForm,
	ssoRoleList,
	ssoRoleOption,
	ssoRoleOptionRelationForm,
	ssoRoleOptionRelationList,
	ssoRoleOptionForm,
	ssoRoleOptionList,
	ssoRoleStatus,
	ssoRoleStatusForm,
	ssoRoleStatusList,
};

export default config;
