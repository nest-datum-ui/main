import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageServDataList from './pages/Serv/Data/List';
import PageSettingList from './pages/Setting/List';
import PageSettingForm from './pages/Setting/Form';

let Registry = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<PageServDataList />} />
				<Route
					path="serv"
					element={<PageServDataList />} />
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

Registry = React.memo(Registry);
Registry.defaultProps = {
};
Registry.propTypes = {
};

export default Registry;
