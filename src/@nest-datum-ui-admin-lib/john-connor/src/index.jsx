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
import RouteManagerList from './routes/Manager/List';

let JohnConnor = () => {
	const { 
		'john-connor': { 
			pageBaseUrl, 
			johnConnorManager,
		}, 
	} = React.useContext(ContextProps);

	return <ContextService.Provider value="john-connor">
		<Routes>
			<Route
				path={`${pageBaseUrl}/*`}
				element={<Layout />}>
				<Route
					index
					element={<RouteManagerList />} />
				<Route
					path={johnConnorManager.pageUrl}
					element={<RouteManagerList />} />
			</Route>
		</Routes>
	</ContextService.Provider>;
};

JohnConnor = React.memo(JohnConnor);
JohnConnor.defaultProps = {
};
JohnConnor.propTypes = {
};

export default JohnConnor;
