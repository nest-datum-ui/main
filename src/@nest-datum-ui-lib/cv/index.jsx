import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteReportDataList from './routes/Report/Data/List';
import RouteReportDataForm from './routes/Report/Data/Form';
import RouteReportStatusList from './routes/Report/Status/List';
import RouteReportStatusForm from './routes/Report/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Sso = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<RouteReportDataList />} />
				<Route
					path=":entityId"
					element={<RouteReportDataForm />} />
				<Route
					path="report"
					element={<RouteReportDataList />} />
				<Route
					path="report/:entityId"
					element={<RouteReportDataForm />} />
				<Route
					path="report/statuses"
					element={<RouteReportStatusList />} />
				<Route
					path="report/statuses/:entityId"
					element={<RouteReportStatusForm />} />
				<Route
					path="settings"
					element={<RouteSettingList />} />
				<Route
					path="settings/:entityId"
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</React.Fragment>;
};

Sso = React.memo(Sso);
Sso.defaultProps = {
};
Sso.propTypes = {
};

export default Sso;
