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
import RouteCountryList from './routes/Country/List';
import RouteCountryForm from './routes/Country/Form';
import RouteCountryOptionList from './routes/Country/Option/List';
import RouteCountryOptionForm from './routes/Country/Option/Form';
import RouteCountryStatusList from './routes/Country/Status/List';
import RouteCountryStatusForm from './routes/Country/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Countries = () => {
	const { 
		countries: { 
			pageBaseUrl, 
			countriesAccess,
			countriesAccessOption,
			countriesAccessStatus,
			countriesSetting,
			countriesCountry,
			countriesCountryOption,
			countriesCountryStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="countries">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteCountryList />} />
				<Route
					path={countriesCountry.pageUrl}
					element={<RouteCountryList />} />
				<Route
					path={`${countriesCountry.pageUrl}/:entityId`}
					element={<RouteCountryForm />} />
				<Route
					path={countriesCountryOption.pageUrl}
					element={<RouteCountryOptionList />} />
				<Route
					path={`${countriesCountryOption.pageUrl}/:entityId`}
					element={<RouteCountryOptionForm />} />
				<Route
					path={countriesCountryStatus.pageUrl}
					element={<RouteCountryStatusList />} />
				<Route
					path={`${countriesCountryStatus.pageUrl}/:entityId`}
					element={<RouteCountryStatusForm />} />
				<Route
					path={countriesAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${countriesAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={countriesAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${countriesAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={countriesAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${countriesAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={countriesSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${countriesSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Countries = React.memo(Countries);
Countries.defaultProps = {
};
Countries.propTypes = {
};

export default Countries;
