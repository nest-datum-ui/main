import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import { 
	ContextService,
	ContextProps, 
} from '@nest-datum-ui/Context';
import Layout from './layouts';
import RouteFormList from './routes/Form/List';
import RouteFormForm from './routes/Form/Form';
import RouteFormOptionList from './routes/Form/Option/List';
import RouteFormOptionForm from './routes/Form/Option/Form';
import RouteFormStatusList from './routes/Form/Status/List';
import RouteFormStatusForm from './routes/Form/Status/Form';
import RouteFieldList from './routes/Field/List';
import RouteFieldForm from './routes/Field/Form';
import RouteFieldOptionList from './routes/Field/Option/List';
import RouteFieldOptionForm from './routes/Field/Option/Form';
import RouteFieldStatusList from './routes/Field/Status/List';
import RouteFieldStatusForm from './routes/Field/Status/Form';
import RouteContentList from './routes/Content/List';
import RouteContentForm from './routes/Content/Form';
import RouteContentStatusList from './routes/Content/Status/List';
import RouteContentStatusForm from './routes/Content/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Forms = () => {
	const { 
		forms: { 
			pageBaseUrl, 
			formsAccess,
			formsAccessOption,
			formsAccessStatus,
			formsSetting,
			formsForm,
			formsFormOption,
			formsFormStatus,
			formsField,
			formsFieldOption,
			formsFieldStatus,
			formsContent,
			formsContentStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="forms">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteFormList />} />
				<Route
					path={formsForm.pageUrl}
					element={<RouteFormList />} />
				<Route
					path={`${formsForm.pageUrl}/:entityId`}
					element={<RouteFormForm />} />
				<Route
					path={formsFormOption.pageUrl}
					element={<RouteFormOptionList />} />
				<Route
					path={`${formsFormOption.pageUrl}/:entityId`}
					element={<RouteFormOptionForm />} />
				<Route
					path={formsFormStatus.pageUrl}
					element={<RouteFormStatusList />} />
				<Route
					path={`${formsFormStatus.pageUrl}/:entityId`}
					element={<RouteFormStatusForm />} />
				<Route
					path={formsField.pageUrl}
					element={<RouteFieldList />} />
				<Route
					path={`${formsField.pageUrl}/:entityId`}
					element={<RouteFieldForm />} />
				<Route
					path={formsFieldOption.pageUrl}
					element={<RouteFieldOptionList />} />
				<Route
					path={`${formsFieldOption.pageUrl}/:entityId`}
					element={<RouteFieldOptionForm />} />
				<Route
					path={formsFieldStatus.pageUrl}
					element={<RouteFieldStatusList />} />
				<Route
					path={`${formsFieldStatus.pageUrl}/:entityId`}
					element={<RouteFieldStatusForm />} />
				<Route
					path={formsContent.pageUrl}
					element={<RouteContentList />} />
				<Route
					path={`${formsContent.pageUrl}/:entityId`}
					element={<RouteContentForm />} />
				<Route
					path={formsContentStatus.pageUrl}
					element={<RouteContentStatusList />} />
				<Route
					path={`${formsContentStatus.pageUrl}/:entityId`}
					element={<RouteContentStatusForm />} />
				<Route
					path={formsAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${formsAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={formsAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${formsAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={formsAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${formsAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={formsSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${formsSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Forms = React.memo(Forms);
Forms.defaultProps = {
};
Forms.propTypes = {
};

export default Forms;
