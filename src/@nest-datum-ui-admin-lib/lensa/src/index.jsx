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

let Lensa = () => {
	const { 
		lensa: { 
			pageBaseUrl, 
			lensaAccess,
			lensaAccessOption,
			lensaAccessStatus,
			lensaSetting,
			lensaReport,
			lensaReportStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="lensa">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteReportList />} />
				<Route
					path={lensaReport.pageUrl}
					element={<RouteReportList />} />
				<Route
					path={`${lensaReport.pageUrl}/:entityId`}
					element={<RouteReportForm />} />
				<Route
					path={lensaReportStatus.pageUrl}
					element={<RouteReportStatusList />} />
				<Route
					path={`${lensaReportStatus.pageUrl}/:entityId`}
					element={<RouteReportStatusForm />} />
				<Route
					path={lensaAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${lensaAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={lensaAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${lensaAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={lensaAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${lensaAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={lensaSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${lensaSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Lensa = React.memo(Lensa);
Lensa.defaultProps = {
};
Lensa.propTypes = {
};

export default Lensa;
