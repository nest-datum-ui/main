import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteErrDataList from './routes/Err/Data/List';
import RouteWarningDataList from './routes/Warning/Data/List';
import RouteNotificationDataList from './routes/Notification/Data/List';
import RouteTrafficDataList from './routes/Traffic/Data/List';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Logs = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<RouteErrDataList />} />
				<Route
					path="err"
					element={<RouteErrDataList />} />
				<Route
					path="warning"
					element={<RouteWarningDataList />} />
				<Route
					path="notification"
					element={<RouteNotificationDataList />} />
				<Route
					path="traffic"
					element={<RouteTrafficDataList />} />
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

Logs = React.memo(Logs);
Logs.defaultProps = {
};
Logs.propTypes = {
};

export default Logs;
