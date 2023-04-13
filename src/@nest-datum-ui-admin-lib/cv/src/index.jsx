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
import RouteReportList from './routes/Report/List';
import RouteReportForm from './routes/Report/Form';
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

let Cv = () => {
	const { 
		cv: { 
			pageBaseUrl, 
			cvAccess,
			cvAccessOption,
			cvAccessStatus,
			cvSetting,
			cvReport,
			cvReportStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="cv">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteReportList />} />
				<Route
					path={cvReport.pageUrl}
					element={<RouteReportList />} />
				<Route
					path={`${cvReport.pageUrl}/:entityId`}
					element={<RouteReportForm />} />
				<Route
					path={cvReportStatus.pageUrl}
					element={<RouteReportStatusList />} />
				<Route
					path={`${cvReportStatus.pageUrl}/:entityId`}
					element={<RouteReportStatusForm />} />
				<Route
					path={cvAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${cvAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={cvAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${cvAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={cvAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${cvAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={cvSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${cvSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Cv = React.memo(Cv);
Cv.defaultProps = {
};
Cv.propTypes = {
};

export default Cv;
