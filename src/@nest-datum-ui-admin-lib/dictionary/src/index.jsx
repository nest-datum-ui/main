import React from 'react';
import { 
	Routes,
	Route, 
} from 'react-router-dom';
import { 
	ContextService,
	ContextProps, 
} from '@nest-datum-ui/Context';
import Layout from './layouts';
import RouteTemplateList from './routes/Template/List';
import RouteTemplateForm from './routes/Template/Form';
import RouteTemplateOptionList from './routes/Template/Option/List';
import RouteTemplateOptionForm from './routes/Template/Option/Form';
import RouteTemplateStatusList from './routes/Template/Status/List';
import RouteTemplateStatusForm from './routes/Template/Status/Form';
import RouteFieldList from './routes/Field/List';
import RouteFieldForm from './routes/Field/Form';
import RouteFieldOptionList from './routes/Field/Option/List';
import RouteFieldOptionForm from './routes/Field/Option/Form';
import RouteFieldStatusList from './routes/Field/Status/List';
import RouteFieldStatusForm from './routes/Field/Status/Form';
import RouteContentList from './routes/Content/List';
import RouteContentForm from './routes/Content/Form';
import RouteContentStatusList from './routes/Content/Status/List';
import RouteContentStatusForm from './routes/Content/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Dictionary = () => {
	const { 
		dictionary: { 
			pageBaseUrl, 
			dictionaryAccess,
			dictionaryAccessOption,
			dictionaryAccessStatus,
			dictionarySetting,
			dictionaryTemplate,
			dictionaryTemplateOption,
			dictionaryTemplateStatus,
			dictionaryField,
			dictionaryFieldOption,
			dictionaryFieldStatus,
			dictionaryContent,
			dictionaryContentStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="dictionary">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteTemplateList />} />
				<Route
					path={dictionaryTemplate.pageUrl}
					element={<RouteTemplateList />} />
				<Route
					path={`${dictionaryTemplate.pageUrl}/:entityId`}
					element={<RouteTemplateForm />} />
				<Route
					path={dictionaryTemplateOption.pageUrl}
					element={<RouteTemplateOptionList />} />
				<Route
					path={`${dictionaryTemplateOption.pageUrl}/:entityId`}
					element={<RouteTemplateOptionForm />} />
				<Route
					path={dictionaryTemplateStatus.pageUrl}
					element={<RouteTemplateStatusList />} />
				<Route
					path={`${dictionaryTemplateStatus.pageUrl}/:entityId`}
					element={<RouteTemplateStatusForm />} />
				<Route
					path={dictionaryField.pageUrl}
					element={<RouteFieldList />} />
				<Route
					path={`${dictionaryField.pageUrl}/:entityId`}
					element={<RouteFieldForm />} />
				<Route
					path={dictionaryFieldOption.pageUrl}
					element={<RouteFieldOptionList />} />
				<Route
					path={`${dictionaryFieldOption.pageUrl}/:entityId`}
					element={<RouteFieldOptionForm />} />
				<Route
					path={dictionaryFieldStatus.pageUrl}
					element={<RouteFieldStatusList />} />
				<Route
					path={`${dictionaryFieldStatus.pageUrl}/:entityId`}
					element={<RouteFieldStatusForm />} />
				<Route
					path={dictionaryContent.pageUrl}
					element={<RouteContentList />} />
				<Route
					path={`${dictionaryContent.pageUrl}/:entityId`}
					element={<RouteContentForm />} />
				<Route
					path={dictionaryContentStatus.pageUrl}
					element={<RouteContentStatusList />} />
				<Route
					path={`${dictionaryContentStatus.pageUrl}/:entityId`}
					element={<RouteContentStatusForm />} />
				<Route
					path={dictionaryAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${dictionaryAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={dictionaryAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${dictionaryAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={dictionaryAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${dictionaryAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={dictionarySetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${dictionarySetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Dictionary = React.memo(Dictionary);
Dictionary.defaultProps = {
};
Dictionary.propTypes = {
};

export default Dictionary;
