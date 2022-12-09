import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteErrDataList from './routes/Err/Data/List';
import RouteErrDataForm from './routes/Err/Data/Form';
import RouteWarningDataList from './routes/Warning/Data/List';
import RouteWarningDataForm from './routes/Warning/Data/Form';
import RouteNotificationDataList from './routes/Notification/Data/List';
import RouteNotificationDataForm from './routes/Notification/Data/Form';
import RouteTrafficDataList from './routes/Traffic/Data/List';
import RouteTrafficDataForm from './routes/Traffic/Data/Form';
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
					element={<RouteErrDataList />} />
				<Route
					path=":entityId"
					element={<RouteErrDataForm />} />
				<Route
					path="err"
					element={<RouteErrDataList />} />
				<Route
					path="err/:entityId"
					element={<RouteErrDataForm />} />
				<Route
					path="warning"
					element={<RouteWarningDataList />} />
				<Route
					path="warning/:entityId"
					element={<RouteWarningDataForm />} />
				<Route
					path="notification"
					element={<RouteNotificationDataList />} />
				<Route
					path="notification/:entityId"
					element={<RouteNotificationDataForm />} />
				<Route
					path="traffic"
					element={<RouteTrafficDataList />} />
				<Route
					path="traffic/:entityId"
					element={<RouteTrafficDataForm />} />
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
