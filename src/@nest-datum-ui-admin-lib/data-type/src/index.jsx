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
import RouteTypeList from './routes/Type/List';
import RouteTypeForm from './routes/Type/Form';
import RouteTypeOptionList from './routes/Type/Option/List';
import RouteTypeOptionForm from './routes/Type/Option/Form';
import RouteTypeStatusList from './routes/Type/Status/List';
import RouteTypeStatusForm from './routes/Type/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let DataType = () => {
	const { 
		'data-type': { 
			pageBaseUrl, 
			dataTypeAccess,
			dataTypeAccessOption,
			dataTypeAccessStatus,
			dataTypeSetting,
			dataType,
			dataTypeOption,
			dataTypeStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="data-type">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteTypeList />} />
				<Route
					path=":entityId"
					element={<RouteTypeForm />} />
				<Route
					path={dataType.pageUrl}
					element={<RouteTypeList />} />
				<Route
					path={`${dataType.pageUrl}/:entityId`}
					element={<RouteTypeForm />} />
				<Route
					path={dataTypeOption.pageUrl}
					element={<RouteTypeOptionList />} />
				<Route
					path={`${dataTypeOption.pageUrl}/:entityId`}
					element={<RouteTypeOptionForm />} />
				<Route
					path={dataTypeStatus.pageUrl}
					element={<RouteTypeStatusList />} />
				<Route
					path={`${dataTypeStatus.pageUrl}/:entityId`}
					element={<RouteTypeStatusForm />} />
				<Route
					path={dataTypeAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${dataTypeAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={dataTypeAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${dataTypeAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={dataTypeAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${dataTypeAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={dataTypeSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${dataTypeSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

DataType = React.memo(DataType);
DataType.defaultProps = {
};
DataType.propTypes = {
};

export default DataType;
