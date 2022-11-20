import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import Layout from './layouts';
import PageLetterDataList from './pages/Letter/Data/List';
import PageLetterDataForm from './pages/Letter/Data/Form';
import PageLetterOptionList from './pages/Letter/Option/List';
import PageLetterOptionForm from './pages/Letter/Option/Form';
import PageLetterStatusList from './pages/Letter/Status/List';
import PageLetterStatusForm from './pages/Letter/Status/Form';
import PageTemplateDataList from './pages/Template/Data/List';
import PageTemplateDataForm from './pages/Template/Data/Form';
import PageTemplateOptionList from './pages/Template/Option/List';
import PageTemplateOptionForm from './pages/Template/Option/Form';
import PageTemplateStatusList from './pages/Template/Status/List';
import PageTemplateStatusForm from './pages/Template/Status/Form';
import PageReportDataList from './pages/Report/Data/List';
import PageReportDataForm from './pages/Report/Data/Form';
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
					element={<PageLetterDataList />} />
				<Route
					path=":entityId"
					element={<PageLetterDataForm />} />
				<Route
					path="letter"
					element={<PageLetterDataList />} />
				<Route
					path="letter/:entityId"
					element={<PageLetterDataForm />} />
				<Route
					path="letter/options"
					element={<PageLetterOptionList />} />
				<Route
					path="letter/options/:entityId"
					element={<PageLetterOptionForm />} />
				<Route
					path="letter/statuses"
					element={<PageLetterStatusList />} />
				<Route
					path="letter/statuses/:entityId"
					element={<PageLetterStatusForm />} />
				<Route
					path="template"
					element={<PageTemplateDataList />} />
				<Route
					path="template/:entityId"
					element={<PageTemplateDataForm />} />
				<Route
					path="template/options"
					element={<PageTemplateOptionList />} />
				<Route
					path="template/options/:entityId"
					element={<PageTemplateOptionForm />} />
				<Route
					path="template/statuses"
					element={<PageTemplateStatusList />} />
				<Route
					path="template/statuses/:entityId"
					element={<PageTemplateStatusForm />} />
				<Route
					path="report"
					element={<PageReportDataList />} />
				<Route
					path="report/:entityId"
					element={<PageReportDataForm />} />
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
