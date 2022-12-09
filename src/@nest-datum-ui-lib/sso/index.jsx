import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteUserDataList from './routes/User/Data/List';
import RouteUserDataForm from './routes/User/Data/Form';
import RouteUserOptionList from './routes/User/Option/List';
import RouteUserOptionForm from './routes/User/Option/Form';
import RouteUserStatusList from './routes/User/Status/List';
import RouteUserStatusForm from './routes/User/Status/Form';
import RouteRoleDataList from './routes/Role/Data/List';
import RouteRoleDataForm from './routes/Role/Data/Form';
import RouteRoleOptionList from './routes/Role/Option/List';
import RouteRoleOptionForm from './routes/Role/Option/Form';
import RouteRoleStatusList from './routes/Role/Status/List';
import RouteRoleStatusForm from './routes/Role/Status/Form';
import RouteAccessDataList from './routes/Access/Data/List';
import RouteAccessDataForm from './routes/Access/Data/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
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
					element={<RouteUserDataList />} />
				<Route
					path=":entityId"
					element={<RouteUserDataForm />} />
				<Route
					path="user"
					element={<RouteUserDataList />} />
				<Route
					path="user/:entityId"
					element={<RouteUserDataForm />} />
				<Route
					path="user/options"
					element={<RouteUserOptionList />} />
				<Route
					path="user/options/:entityId"
					element={<RouteUserOptionForm />} />
				<Route
					path="user/statuses"
					element={<RouteUserStatusList />} />
				<Route
					path="user/statuses/:entityId"
					element={<RouteUserStatusForm />} />
				<Route
					path="role"
					element={<RouteRoleDataList />} />
				<Route
					path="role/:entityId"
					element={<RouteRoleDataForm />} />
				<Route
					path="role/options"
					element={<RouteRoleOptionList />} />
				<Route
					path="role/options/:entityId"
					element={<RouteRoleOptionForm />} />
				<Route
					path="role/statuses"
					element={<RouteRoleStatusList />} />
				<Route
					path="role/statuses/:entityId"
					element={<RouteRoleStatusForm />} />
				<Route
					path="access"
					element={<RouteAccessDataList />} />
				<Route
					path="access/:entityId"
					element={<RouteAccessDataForm />} />
				<Route
					path="access/options"
					element={<RouteAccessOptionList />} />
				<Route
					path="access/options/:entityId"
					element={<RouteAccessOptionForm />} />
				<Route
					path="access/statuses"
					element={<RouteAccessStatusList />} />
				<Route
					path="access/statuses/:entityId"
					element={<RouteAccessStatusForm />} />
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
