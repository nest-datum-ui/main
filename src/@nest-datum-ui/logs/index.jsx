import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageErrDataList from './pages/Err/Data/List';
import PageErrDataForm from './pages/Err/Data/Form';
// import PageWarningDataList from './pages/Warning/Data/List';
// import PageWarningDataForm from './pages/Warning/Data/Form';
// import PageNotificationDataList from './pages/Notification/Data/List';
// import PageNotificationDataForm from './pages/Notification/Data/Form';
// import PageTrafficDataList from './pages/Traffic/Data/List';
// import PageTrafficDataForm from './pages/Traffic/Data/Form';
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
					element={<PageErrDataList />} />
				<Route
					path=":entityId"
					element={<PageErrDataForm />} />
				<Route
					path="err"
					element={<PageErrDataList />} />
				<Route
					path="err/:entityId"
					element={<PageErrDataForm />} />
				{/*<Route
					path="warning"
					element={<PageWarningDataList />} />
				<Route
					path="warning/:entityId"
					element={<PageWarningDataForm />} />
				<Route
					path="notification"
					element={<PageNotificationDataList />} />
				<Route
					path="notification/:entityId"
					element={<PageNotificationDataForm />} />
				<Route
					path="traffic"
					element={<PageTrafficDataList />} />
				<Route
					path="traffic/:entityId"
					element={<PageTrafficDataForm />} />*/}
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
