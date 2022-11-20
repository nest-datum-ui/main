import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageStorageDataList from './pages/Storage/Data/List';
import PageSettingList from './pages/Setting/List';
import PageSettingForm from './pages/Setting/Form';

let Files = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<PageStorageDataList />} />
				<Route
					path="storage"
					element={<PageStorageDataList />} />
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

Files = React.memo(Files);
Files.defaultProps = {
};
Files.propTypes = {
};

export default Files;
