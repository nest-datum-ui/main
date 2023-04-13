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

let WebSocket = () => {
	const { 
		'web-socket': { 
			pageBaseUrl, 
			webSocketAccess,
			webSocketAccessOption,
			webSocketAccessStatus,
			webSocketSetting,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="web-socket">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteSettingList />} />
				<Route
					path={webSocketSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${webSocketSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
				<Route
					path={webSocketAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${webSocketAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={webSocketAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${webSocketAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={webSocketAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${webSocketAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

WebSocket = React.memo(WebSocket);
WebSocket.defaultProps = {
};
WebSocket.propTypes = {
};

export default WebSocket;
