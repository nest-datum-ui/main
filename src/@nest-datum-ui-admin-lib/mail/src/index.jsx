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
import RouteLetterList from './routes/Letter/List';
import RouteLetterForm from './routes/Letter/Form';
import RouteLetterOptionList from './routes/Letter/Option/List';
import RouteLetterOptionForm from './routes/Letter/Option/Form';
import RouteLetterStatusList from './routes/Letter/Status/List';
import RouteLetterStatusForm from './routes/Letter/Status/Form';
import RouteTemplateList from './routes/Template/List';
import RouteTemplateForm from './routes/Template/Form';
import RouteTemplateOptionList from './routes/Template/Option/List';
import RouteTemplateOptionForm from './routes/Template/Option/Form';
import RouteTemplateStatusList from './routes/Template/Status/List';
import RouteTemplateStatusForm from './routes/Template/Status/Form';
import RouteReportList from './routes/Report/List';
import RouteReportStatusList from './routes/Report/Status/List';
import RouteReportStatusForm from './routes/Report/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Mail = () => {
	const { 
		mail: { 
			pageBaseUrl, 
			mailAccess,
			mailAccessOption,
			mailAccessStatus,
			mailSetting,
			mailLetterOption,
			mailLetterStatus,
			mailLetter,
			mailTemplate,
			mailTemplateOption,
			mailTemplateStatus,
			mailReport,
			mailReportStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="mail">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteLetterList />} />
				<Route
					path={mailLetter.pageUrl}
					element={<RouteLetterList />} />
				<Route
					path={`${mailLetter.pageUrl}/:entityId`}
					element={<RouteLetterForm />} />
				<Route
					path={mailLetterOption.pageUrl}
					element={<RouteLetterOptionList />} />
				<Route
					path={`${mailLetterOption.pageUrl}/:entityId`}
					element={<RouteLetterOptionForm />} />
				<Route
					path={mailLetterStatus.pageUrl}
					element={<RouteLetterStatusList />} />
				<Route
					path={`${mailLetterStatus.pageUrl}/:entityId`}
					element={<RouteLetterStatusForm />} />
				<Route
					path={mailTemplate.pageUrl}
					element={<RouteTemplateList />} />
				<Route
					path={`${mailTemplate.pageUrl}/:entityId`}
					element={<RouteTemplateForm />} />
				<Route
					path={mailTemplateOption.pageUrl}
					element={<RouteTemplateOptionList />} />
				<Route
					path={`${mailTemplateOption.pageUrl}/:entityId`}
					element={<RouteTemplateOptionForm />} />
				<Route
					path={mailTemplateStatus.pageUrl}
					element={<RouteTemplateStatusList />} />
				<Route
					path={`${mailTemplateStatus.pageUrl}/:entityId`}
					element={<RouteTemplateStatusForm />} />
				<Route
					path={mailReport.pageUrl}
					element={<RouteReportList />} />
				<Route
					path={mailReportStatus.pageUrl}
					element={<RouteReportStatusList />} />
				<Route
					path={`${mailReportStatus.pageUrl}/:entityId`}
					element={<RouteReportStatusForm />} />
				<Route
					path={mailAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${mailAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={mailAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${mailAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={mailAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${mailAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={mailSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${mailSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Mail = React.memo(Mail);
Mail.defaultProps = {
};
Mail.propTypes = {
};

export default Mail;
