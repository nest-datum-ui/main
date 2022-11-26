import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageManageDataList from './pages/Manage/Data/List';
import PageSystemDataList from './pages/System/Data/List';
import PageSystemDataForm from './pages/System/Data/Form';
import PageSystemOptionList from './pages/System/Option/List';
import PageSystemOptionForm from './pages/System/Option/Form';
import PageSystemStatusList from './pages/System/Status/List';
import PageSystemStatusForm from './pages/System/Status/Form';
import PageProviderDataList from './pages/Provider/Data/List';
import PageProviderDataForm from './pages/Provider/Data/Form';
import PageProviderOptionList from './pages/Provider/Option/List';
import PageProviderOptionForm from './pages/Provider/Option/Form';
import PageProviderStatusList from './pages/Provider/Status/List';
import PageProviderStatusForm from './pages/Provider/Status/Form';
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
					element={<PageManageDataList />} />
				<Route
					path="manage/*"
					element={<PageManageDataList />} />
				<Route
					path="system"
					element={<PageSystemDataList />} />
				<Route
					path="system/:entityId"
					element={<PageSystemDataForm />} />
				<Route
					path="system/options"
					element={<PageSystemOptionList />} />
				<Route
					path="system/options/:entityId"
					element={<PageSystemOptionForm />} />
				<Route
					path="system/statuses"
					element={<PageSystemStatusList />} />
				<Route
					path="system/statuses/:entityId"
					element={<PageSystemStatusForm />} />
				<Route
					path="provider"
					element={<PageProviderDataList />} />
				<Route
					path="provider/:entityId"
					element={<PageProviderDataForm />} />
				<Route
					path="provider/options"
					element={<PageProviderOptionList />} />
				<Route
					path="provider/options/:entityId"
					element={<PageProviderOptionForm />} />
				<Route
					path="provider/statuses"
					element={<PageProviderStatusList />} />
				<Route
					path="provider/statuses/:entityId"
					element={<PageProviderStatusForm />} />
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
