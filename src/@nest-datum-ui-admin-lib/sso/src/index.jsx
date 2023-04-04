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
import RouteUserList from './routes/User/List';
import RouteUserForm from './routes/User/Form';
import RouteUserOptionList from './routes/User/Option/List';
import RouteUserOptionForm from './routes/User/Option/Form';
import RouteUserStatusList from './routes/User/Status/List';
import RouteUserStatusForm from './routes/User/Status/Form';
import RouteRoleList from './routes/Role/List';
import RouteRoleForm from './routes/Role/Form';
import RouteRoleOptionList from './routes/Role/Option/List';
import RouteRoleOptionForm from './routes/Role/Option/Form';
import RouteRoleStatusList from './routes/Role/Status/List';
import RouteRoleStatusForm from './routes/Role/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Sso = () => {
	const { 
		sso: { 
			pageBaseUrl,
			ssoSetting,
			ssoAccess,
			ssoAccessOption,
			ssoAccessStatus,
			ssoRole,
			ssoRoleOption,
			ssoRoleStatus,
			ssoUser,
			ssoUserOption,
			ssoUserStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="sso">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteUserList />} />
				<Route
					path={`${ssoUser.pageUrl}/:entityId`}
					element={<RouteUserForm />} />
				<Route
					path={ssoUser.pageUrl}
					element={<RouteUserList />} />
				<Route
					path={`${ssoUser.pageUrl}/:entityId`}
					element={<RouteUserForm />} />
				<Route
					path={ssoUserOption.pageUrl}
					element={<RouteUserOptionList />} />
				<Route
					path={`${ssoUserOption.pageUrl}/:entityId`}
					element={<RouteUserOptionForm />} />
				<Route
					path={ssoUserStatus.pageUrl}
					element={<RouteUserStatusList />} />
				<Route
					path={`${ssoUserStatus.pageUrl}/:entityId`}
					element={<RouteUserStatusForm />} />
				<Route
					path={ssoRole.pageUrl}
					element={<RouteRoleList />} />
				<Route
					path={`${ssoRole.pageUrl}/:entityId`}
					element={<RouteRoleForm />} />
				<Route
					path={ssoRoleOption.pageUrl}
					element={<RouteRoleOptionList />} />
				<Route
					path={`${ssoRoleOption.pageUrl}/:entityId`}
					element={<RouteRoleOptionForm />} />
				<Route
					path={ssoRoleStatus.pageUrl}
					element={<RouteRoleStatusList />} />
				<Route
					path={`${ssoRoleStatus.pageUrl}/:entityId`}
					element={<RouteRoleStatusForm />} />
				<Route
					path={ssoAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${ssoAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={ssoAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${ssoAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={ssoAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${ssoAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={ssoSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${ssoSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Sso = React.memo(Sso);
Sso.defaultProps = {
};
Sso.propTypes = {
};

export default Sso;
