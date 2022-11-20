import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
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
					element={<PageSettingList />} />
				<Route
					path=":entityId"
					element={<PageSettingForm />} />
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
