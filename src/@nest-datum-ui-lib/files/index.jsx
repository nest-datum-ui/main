import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteManageDataList from './routes/Manage/Data/List';
import RouteSystemDataList from './routes/System/Data/List';
import RouteSystemDataForm from './routes/System/Data/Form';
import RouteSystemOptionList from './routes/System/Option/List';
import RouteSystemOptionForm from './routes/System/Option/Form';
import RouteSystemStatusList from './routes/System/Status/List';
import RouteSystemStatusForm from './routes/System/Status/Form';
import RouteProviderDataList from './routes/Provider/Data/List';
import RouteProviderDataForm from './routes/Provider/Data/Form';
import RouteProviderOptionList from './routes/Provider/Option/List';
import RouteProviderOptionForm from './routes/Provider/Option/Form';
import RouteProviderStatusList from './routes/Provider/Status/List';
import RouteProviderStatusForm from './routes/Provider/Status/Form';
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
					element={<RouteManageDataList />} />
				<Route
					path="manage/*"
					element={<RouteManageDataList />} />
				<Route
					path="system"
					element={<RouteSystemDataList />} />
				<Route
					path="system/:entityId"
					element={<RouteSystemDataForm />} />
				<Route
					path="system/options"
					element={<RouteSystemOptionList />} />
				<Route
					path="system/options/:entityId"
					element={<RouteSystemOptionForm />} />
				<Route
					path="system/statuses"
					element={<RouteSystemStatusList />} />
				<Route
					path="system/statuses/:entityId"
					element={<RouteSystemStatusForm />} />
				<Route
					path="provider"
					element={<RouteProviderDataList />} />
				<Route
					path="provider/:entityId"
					element={<RouteProviderDataForm />} />
				<Route
					path="provider/options"
					element={<RouteProviderOptionList />} />
				<Route
					path="provider/options/:entityId"
					element={<RouteProviderOptionForm />} />
				<Route
					path="provider/statuses"
					element={<RouteProviderStatusList />} />
				<Route
					path="provider/statuses/:entityId"
					element={<RouteProviderStatusForm />} />
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
