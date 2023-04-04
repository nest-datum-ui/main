import dataTypeAccessForm from './accessForm.js';
import dataTypeAccessFormRelationList from './accessFormRelationList.js';
import dataTypeAccessFormRelationForm from './accessFormRelationForm.js';
import dataTypeAccessList from './accessList.js';
import dataTypeAccessOptionForm from './accessOptionForm.js';
import dataTypeAccessOptionRelationForm from './accessOptionRelationForm.js';
import dataTypeAccessOptionRelationList from './accessOptionRelationList.js';
import dataTypeAccessOptionList from './accessOptionList.js';
import dataTypeAccessStatusForm from './accessStatusForm.js';
import dataTypeAccessStatusList from './accessStatusList.js';
import dataTypeSettingForm from './settingForm.js';
import dataTypeSettingList from './settingList.js';
import dataTypeForm from './form.js';
import dataTypeFormRelationList from './formRelationList.js';
import dataTypeFormRelationForm from './formRelationForm.js';
import dataTypeList from './list.js';
import dataTypeOptionRelationForm from './optionRelationForm.js';
import dataTypeOptionRelationList from './optionRelationList.js';
import dataTypeOptionForm from './optionForm.js';
import dataTypeOptionList from './optionList.js';
import dataTypeStatusForm from './statusForm.js';
import dataTypeStatusList from './statusList.js';

const config = {
	name: 'data-type',
	pagePrefixUrl: 'app',
	pageSeparateBaseUrl: 'data-type',
	pageBaseUrl: 'data-type',
	pageInitialUrl: 'types',
	apiBaseUrl: process.env.URL_API_DATA_TYPE,
	title: 'Data types',

	dataTypeAccess: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Accesses',

		displayInHeaderTabMenu: true,
		orderInHeaderTabMenu: 1,
		headerTabMenuTitle: 'Accesses',

		pageUrl: 'accesses',
		pageTitle: 'Accesses',
	},
	dataTypeAccessOption: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Options',

		pageUrl: 'accesses/options',
		pageTitle: 'Options',

		fieldsBlock: true,
		fieldsBlockTitle: 'Options:',
	},
	dataTypeAccessStatus: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Statuses',

		pageUrl: 'accesses/statuses',
		pageTitle: 'Options',
	},
	dataTypeSetting: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Settings',

		displayInHeaderTabMenu: true,
		orderInHeaderTabMenu: 9999,
		headerTabMenuTitle: 'Settings',

		pageUrl: 'settings',
		pageTitle: 'Settings',
	},
	dataType: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Data types',

		displayInHeaderTabMenu: true,
		orderInHeaderTabMenu: 0,
		headerTabMenuTitle: 'Data types',

		pageUrl: 'types',
		pageTitle: 'Data types',
	},
	dataTypeOption: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Options',

		pageUrl: 'types/options',
		pageTitle: 'Options',

		fieldsBlock: true,
		fieldsBlockTitle: 'Options:',
	},
	dataTypeStatus: {
		displayInBreadcrumbsMenu: true,
		breadcrumbsMenuTitle: 'Statuses',

		pageUrl: 'types/statuses',
		pageTitle: 'Options',
	},
	dataTypeAccessForm,
	dataTypeAccessFormRelationList,
	dataTypeAccessFormRelationForm,
	dataTypeAccessList,
	dataTypeAccessOptionForm,
	dataTypeAccessOptionRelationForm,
	dataTypeAccessOptionRelationList,
	dataTypeAccessOptionList,
	dataTypeAccessStatusForm,
	dataTypeAccessStatusList,
	dataTypeSettingForm,
	dataTypeSettingList,
	dataTypeForm,
	dataTypeFormRelationList,
	dataTypeFormRelationForm,
	dataTypeList,
	dataTypeOptionRelationForm,
	dataTypeOptionRelationList,
	dataTypeOptionForm,
	dataTypeOptionList,
	dataTypeStatusForm,
	dataTypeStatusList,
};

export default config;
