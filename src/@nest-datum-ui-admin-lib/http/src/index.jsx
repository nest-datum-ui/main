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
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Http = () => {
	const { 
		http: { 
			pageBaseUrl, 
			httpAccess,
			httpAccessOption,
			httpAccessStatus,
			httpSetting,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="http">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteSettingList />} />
				<Route
					path={httpSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${httpSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
				<Route
					path={httpAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${httpAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={httpAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${httpAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={httpAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${httpAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Http = React.memo(Http);
Http.defaultProps = {
};
Http.propTypes = {
};

export default Http;
