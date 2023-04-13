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
import RouteManagerList from './routes/Manager/List';
import RouteSystemList from './routes/System/List';
import RouteSystemForm from './routes/System/Form';
import RouteSystemOptionList from './routes/System/Option/List';
import RouteSystemOptionForm from './routes/System/Option/Form';
import RouteSystemStatusList from './routes/System/Status/List';
import RouteSystemStatusForm from './routes/System/Status/Form';
import RouteProviderList from './routes/Provider/List';
import RouteProviderForm from './routes/Provider/Form';
import RouteProviderOptionList from './routes/Provider/Option/List';
import RouteProviderOptionForm from './routes/Provider/Option/Form';
import RouteProviderStatusList from './routes/Provider/Status/List';
import RouteProviderStatusForm from './routes/Provider/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Files = () => {
	const { 
		files: { 
			pageBaseUrl, 
			filesAccess,
			filesAccessOption,
			filesAccessStatus,
			filesManager,
			filesSetting,
			filesProvider,
			filesSystemOption,
			filesSystemStatus,
			filesSystem,
			filesProviderOption,
			filesProviderStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="files">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteManagerList />} />
				<Route
					path={filesManager.pageUrl}
					element={<RouteManagerList />} />
				<Route
					path={filesSystem.pageUrl}
					element={<RouteSystemList />} />
				<Route
					path={`${filesSystem.pageUrl}/:entityId`}
					element={<RouteSystemForm />} />
				<Route
					path={filesSystemOption.pageUrl}
					element={<RouteSystemOptionList />} />
				<Route
					path={`${filesSystemOption.pageUrl}/:entityId`}
					element={<RouteSystemOptionForm />} />
				<Route
					path={filesSystemStatus.pageUrl}
					element={<RouteSystemStatusList />} />
				<Route
					path={`${filesSystemStatus.pageUrl}/:entityId`}
					element={<RouteSystemStatusForm />} />
				<Route
					path={filesProvider.pageUrl}
					element={<RouteProviderList />} />
				<Route
					path={`${filesProvider.pageUrl}/:entityId`}
					element={<RouteProviderForm />} />
				<Route
					path={filesProviderOption.pageUrl}
					element={<RouteProviderOptionList />} />
				<Route
					path={`${filesProviderOption.pageUrl}/:entityId`}
					element={<RouteProviderOptionForm />} />
				<Route
					path={filesProviderStatus.pageUrl}
					element={<RouteProviderStatusList />} />
				<Route
					path={`${filesProviderStatus.pageUrl}/:entityId`}
					element={<RouteProviderStatusForm />} />
				<Route
					path={filesAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${filesAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={filesAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${filesAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={filesAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${filesAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={filesSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${filesSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Files = React.memo(Files);
Files.defaultProps = {
};
Files.propTypes = {
};

export default Files;
