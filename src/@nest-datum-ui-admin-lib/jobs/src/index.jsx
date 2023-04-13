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
import RouteJobList from './routes/Job/List';
import RouteJobForm from './routes/Job/Form';
import RouteJobOptionList from './routes/Job/Option/List';
import RouteJobOptionForm from './routes/Job/Option/Form';
import RouteJobStatusList from './routes/Job/Status/List';
import RouteJobStatusForm from './routes/Job/Status/Form';
import RouteAccessList from './routes/Access/List';
import RouteAccessForm from './routes/Access/Form';
import RouteAccessOptionList from './routes/Access/Option/List';
import RouteAccessOptionForm from './routes/Access/Option/Form';
import RouteAccessStatusList from './routes/Access/Status/List';
import RouteAccessStatusForm from './routes/Access/Status/Form';
import RouteSettingList from './routes/Setting/List';
import RouteSettingForm from './routes/Setting/Form';

let Jobs = () => {
	const { 
		jobs: { 
			pageBaseUrl, 
			jobsAccess,
			jobsAccessOption,
			jobsAccessStatus,
			jobsSetting,
			jobsJob,
			jobsJobOption,
			jobsJobStatus,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="jobs">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteJobList />} />
				<Route
					path={jobsJob.pageUrl}
					element={<RouteJobList />} />
				<Route
					path={`${jobsJob.pageUrl}/:entityId`}
					element={<RouteJobForm />} />
				<Route
					path={jobsJobOption.pageUrl}
					element={<RouteJobOptionList />} />
				<Route
					path={`${jobsJobOption.pageUrl}/:entityId`}
					element={<RouteJobOptionForm />} />
				<Route
					path={jobsJobStatus.pageUrl}
					element={<RouteJobStatusList />} />
				<Route
					path={`${jobsJobStatus.pageUrl}/:entityId`}
					element={<RouteJobStatusForm />} />
				<Route
					path={jobsAccess.pageUrl}
					element={<RouteAccessList />} />
				<Route
					path={`${jobsAccess.pageUrl}/:entityId`}
					element={<RouteAccessForm />} />
				<Route
					path={jobsAccessOption.pageUrl}
					element={<RouteAccessOptionList />} />
				<Route
					path={`${jobsAccessOption.pageUrl}/:entityId`}
					element={<RouteAccessOptionForm />} />
				<Route
					path={jobsAccessStatus.pageUrl}
					element={<RouteAccessStatusList />} />
				<Route
					path={`${jobsAccessStatus.pageUrl}/:entityId`}
					element={<RouteAccessStatusForm />} />
				<Route
					path={jobsSetting.pageUrl}
					element={<RouteSettingList />} />
				<Route
					path={`${jobsSetting.pageUrl}/:entityId`}
					element={<RouteSettingForm />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

Jobs = React.memo(Jobs);
Jobs.defaultProps = {
};
Jobs.propTypes = {
};

export default Jobs;
