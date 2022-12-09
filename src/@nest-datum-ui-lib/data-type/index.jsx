import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteTypeDataList from './routes/Type/Data/List';
import RouteTypeDataForm from './routes/Type/Data/Form';
import RouteTypeOptionList from './routes/Type/Option/List';
import RouteTypeOptionForm from './routes/Type/Option/Form';
import RouteTypeStatusList from './routes/Type/Status/List';
import RouteTypeStatusForm from './routes/Type/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let DateType = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<RouteTypeDataList />} />
				<Route
					path=":entityId"
					element={<RouteTypeDataForm />} />
				<Route
					path="type"
					element={<RouteTypeDataList />} />
				<Route
					path="type/:entityId"
					element={<RouteTypeDataForm />} />
				<Route
					path="type/options"
					element={<RouteTypeOptionList />} />
				<Route
					path="type/options/:entityId"
					element={<RouteTypeOptionForm />} />
				<Route
					path="type/statuses"
					element={<RouteTypeStatusList />} />
				<Route
					path="type/statuses/:entityId"
					element={<RouteTypeStatusForm />} />
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

DateType = React.memo(DateType);
DateType.defaultProps = {
};
DateType.propTypes = {
};

export default DateType;
