import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteLetterDataList from './routes/Letter/Data/List';
import RouteLetterDataForm from './routes/Letter/Data/Form';
import RouteLetterOptionList from './routes/Letter/Option/List';
import RouteLetterOptionForm from './routes/Letter/Option/Form';
import RouteLetterStatusList from './routes/Letter/Status/List';
import RouteLetterStatusForm from './routes/Letter/Status/Form';
import RouteTemplateDataList from './routes/Template/Data/List';
import RouteTemplateDataForm from './routes/Template/Data/Form';
import RouteTemplateOptionList from './routes/Template/Option/List';
import RouteTemplateOptionForm from './routes/Template/Option/Form';
import RouteTemplateStatusList from './routes/Template/Status/List';
import RouteTemplateStatusForm from './routes/Template/Status/Form';
import RouteReportDataList from './routes/Report/Data/List';
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
					element={<RouteLetterDataList />} />
				<Route
					path=":entityId"
					element={<RouteLetterDataForm />} />
				<Route
					path="letter"
					element={<RouteLetterDataList />} />
				<Route
					path="letter/:entityId"
					element={<RouteLetterDataForm />} />
				<Route
					path="letter/options"
					element={<RouteLetterOptionList />} />
				<Route
					path="letter/options/:entityId"
					element={<RouteLetterOptionForm />} />
				<Route
					path="letter/statuses"
					element={<RouteLetterStatusList />} />
				<Route
					path="letter/statuses/:entityId"
					element={<RouteLetterStatusForm />} />
				<Route
					path="template"
					element={<RouteTemplateDataList />} />
				<Route
					path="template/:entityId"
					element={<RouteTemplateDataForm />} />
				<Route
					path="template/options"
					element={<RouteTemplateOptionList />} />
				<Route
					path="template/options/:entityId"
					element={<RouteTemplateOptionForm />} />
				<Route
					path="template/statuses"
					element={<RouteTemplateStatusList />} />
				<Route
					path="template/statuses/:entityId"
					element={<RouteTemplateStatusForm />} />
				<Route
					path="report"
					element={<RouteReportDataList />} />
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
