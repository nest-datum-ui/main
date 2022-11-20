import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageTypeDataList from './pages/Type/Data/List';
import PageTypeDataForm from './pages/Type/Data/Form';
import PageTypeOptionList from './pages/Type/Option/List';
import PageTypeOptionForm from './pages/Type/Option/Form';
import PageTypeStatusList from './pages/Type/Status/List';
import PageTypeStatusForm from './pages/Type/Status/Form';
import PageSettingList from './pages/Setting/List';
import PageSettingForm from './pages/Setting/Form';

let DateType = () => {
	return <React.Fragment>
		<Routes>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<PageTypeDataList />} />
				<Route
					path=":entityId"
					element={<PageTypeDataForm />} />
				<Route
					path="type"
					element={<PageTypeDataList />} />
				<Route
					path="type/:entityId"
					element={<PageTypeDataForm />} />
				<Route
					path="type/options"
					element={<PageTypeOptionList />} />
				<Route
					path="type/options/:entityId"
					element={<PageTypeOptionForm />} />
				<Route
					path="type/statuses"
					element={<PageTypeStatusList />} />
				<Route
					path="type/statuses/:entityId"
					element={<PageTypeStatusForm />} />
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

DateType = React.memo(DateType);
DateType.defaultProps = {
};
DateType.propTypes = {
};

export default DateType;
