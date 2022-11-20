import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageTrafficDataList from './pages/Traffic/Data/List';
import PageErrDataList from './pages/Err/Data/List';
import PageWarningDataList from './pages/Warning/Data/List';
import PageNotificationDataList from './pages/Notification/Data/List';
import PageSettingList from './pages/Setting/List';
import PageSettingForm from './pages/Setting/Form';

let Сore = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<PageTrafficDataList />} />
				<Route
					path="traffic"
					element={<PageTrafficDataList />} />
				<Route
					path="error"
					element={<PageErrDataList />} />
				<Route
					path="warning"
					element={<PageWarningDataList />} />
				<Route
					path="notification"
					element={<PageNotificationDataList />} />
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

Сore = React.memo(Сore);
Сore.defaultProps = {
};
Сore.propTypes = {
};

export default Сore;
