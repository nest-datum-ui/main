import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageUserDataList from './pages/User/Data/List';
import PageUserDataForm from './pages/User/Data/Form';
import PageUserOptionList from './pages/User/Option/List';
import PageUserOptionForm from './pages/User/Option/Form';
import PageUserStatusList from './pages/User/Status/List';
import PageUserStatusForm from './pages/User/Status/Form';
import PageRoleDataList from './pages/Role/Data/List';
import PageRoleDataForm from './pages/Role/Data/Form';
import PageRoleOptionList from './pages/Role/Option/List';
import PageRoleOptionForm from './pages/Role/Option/Form';
import PageRoleStatusList from './pages/Role/Status/List';
import PageRoleStatusForm from './pages/Role/Status/Form';
import PageAccessDataList from './pages/Access/Data/List';
import PageAccessDataForm from './pages/Access/Data/Form';
import PageAccessOptionList from './pages/Access/Option/List';
import PageAccessOptionForm from './pages/Access/Option/Form';
import PageAccessStatusList from './pages/Access/Status/List';
import PageAccessStatusForm from './pages/Access/Status/Form';
import PageSettingList from './pages/Setting/List';
import PageSettingForm from './pages/Setting/Form';

let Sso = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<PageUserDataList />} />
				<Route
					path=":entityId"
					element={<PageUserDataForm />} />
				<Route
					path="user"
					element={<PageUserDataList />} />
				<Route
					path="user/:entityId"
					element={<PageUserDataForm />} />
				<Route
					path="user/options"
					element={<PageUserOptionList />} />
				<Route
					path="user/options/:entityId"
					element={<PageUserOptionForm />} />
				<Route
					path="user/statuses"
					element={<PageUserStatusList />} />
				<Route
					path="user/statuses/:entityId"
					element={<PageUserStatusForm />} />
				<Route
					path="role"
					element={<PageRoleDataList />} />
				<Route
					path="role/:entityId"
					element={<PageRoleDataForm />} />
				<Route
					path="role/options"
					element={<PageRoleOptionList />} />
				<Route
					path="role/options/:entityId"
					element={<PageRoleOptionForm />} />
				<Route
					path="role/statuses"
					element={<PageRoleStatusList />} />
				<Route
					path="role/statuses/:entityId"
					element={<PageRoleStatusForm />} />
				<Route
					path="access"
					element={<PageAccessDataList />} />
				<Route
					path="access/:entityId"
					element={<PageAccessDataForm />} />
				<Route
					path="access/options"
					element={<PageAccessOptionList />} />
				<Route
					path="access/options/:entityId"
					element={<PageAccessOptionForm />} />
				<Route
					path="access/statuses"
					element={<PageAccessStatusList />} />
				<Route
					path="access/statuses/:entityId"
					element={<PageAccessStatusForm />} />
				<Route
					path="settings"
					element={<PageSettingList />} />
				<Route
					path="settings/:entityId"
					element={<PageSettingForm />} />
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
