import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import RouteContentDataList from './routes/Content/Data/List';
import RouteContentDataForm from './routes/Content/Data/Form';
import RouteContentStatusList from './routes/Content/Status/List';
import RouteContentStatusForm from './routes/Content/Status/Form';
import RouteFormDataList from './routes/Form/Data/List';
import RouteFormDataForm from './routes/Form/Data/Form';
import RouteFormOptionList from './routes/Form/Option/List';
import RouteFormOptionForm from './routes/Form/Option/Form';
import RouteFormStatusList from './routes/Form/Status/List';
import RouteFormStatusForm from './routes/Form/Status/Form';
import RouteFieldDataList from './routes/Field/Data/List';
import RouteFieldDataForm from './routes/Field/Data/Form';
import RouteFieldOptionList from './routes/Field/Option/List';
import RouteFieldOptionForm from './routes/Field/Option/Form';
import RouteFieldStatusList from './routes/Field/Status/List';
import RouteFieldStatusForm from './routes/Field/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Forms = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<RouteFormDataList />} />
				<Route
					path=":entityId"
					element={<RouteFormDataList />} />
				<Route
					path="form"
					element={<RouteFormDataList />} />
				<Route
					path="form/:entityId"
					element={<RouteFormDataForm />} />
				<Route
					path="form/options"
					element={<RouteFormOptionList />} />
				<Route
					path="form/options/:entityId"
					element={<RouteFormOptionForm />} />
				<Route
					path="form/statuses"
					element={<RouteFormStatusList />} />
				<Route
					path="form/statuses/:entityId"
					element={<RouteFormStatusForm />} />
				<Route
					path="field"
					element={<RouteFieldDataList />} />
				<Route
					path="field/:entityId"
					element={<RouteFieldDataForm />} />
				<Route
					path="field/options"
					element={<RouteFieldOptionList />} />
				<Route
					path="field/options/:entityId"
					element={<RouteFieldOptionForm />} />
				<Route
					path="field/statuses"
					element={<RouteFieldStatusList />} />
				<Route
					path="field/statuses/:entityId"
					element={<RouteFieldStatusForm />} />
				<Route
					path="content"
					element={<RouteContentDataList />} />
				<Route
					path="content/:entityId"
					element={<RouteContentDataForm />} />
				<Route
					path="content/statuses"
					element={<RouteContentStatusList />} />
				<Route
					path="content/statuses/:entityId"
					element={<RouteContentStatusForm />} />
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

Forms = React.memo(Forms);
Forms.defaultProps = {
};
Forms.propTypes = {
};

export default Forms;
