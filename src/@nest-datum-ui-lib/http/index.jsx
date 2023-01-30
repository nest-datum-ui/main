import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Http = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<RouteSettingList />} />
				<Route
					path=":entityId"
					element={<RouteSettingForm />} />
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

Http = React.memo(Http);
Http.defaultProps = {
};
Http.propTypes = {
};

export default Http;
