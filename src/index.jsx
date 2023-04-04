import { createRoot } from 'react-dom/client';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ContextProps } from '@nest-datum-ui/Context';
import { Provider as ProviderStore } from '@nest-datum-ui/Store';
import { Provider as ProviderTheme } from '@nest-datum-ui/Theme';
import { Provider as ProviderLanguage } from '@nest-datum-ui/Language';
import Layout from '@nest-datum-ui/Layout';
import LayoutApp from 'layouts/App';
import RouteSystemNotFound from 'routes/System/NotFound';
import RouteHome from 'routes/Home';
import RouteAuthedDashboard from 'routes/Authed/Dashboard';
import SsoRouteSignIn from '@nest-datum-ui-admin-lib/sso/src/routes/SignIn';
import SsoRouteSignUp from '@nest-datum-ui-admin-lib/sso/src/routes/SignUp';
import SsoRouteRecovery from '@nest-datum-ui-admin-lib/sso/src/routes/Recovery';
import SsoRouteReset from '@nest-datum-ui-admin-lib/sso/src/routes/Reset';
import SsoRouteVerify from '@nest-datum-ui-admin-lib/sso/src/routes/Verify';
import Sso from '@nest-datum-ui-admin-lib/sso/src';
import DataType from '@nest-datum-ui-admin-lib/data-type/src';
import GlobalStyles from './globalStyles.js';
import importSchema from './importSchema.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<ContextProps.Provider value={importSchema}>
	<ProviderStore>
		<ProviderTheme>
			<SnackbarProvider>
				<ProviderLanguage>
					<BrowserRouter>
						<Routes>
							<Route 
								path=""
								element={<Layout />}>
								<Route
									path=""
									element={<RouteHome />} />
								<Route
									path={process.env.ROUTE_SiGN_IN}
									element={<SsoRouteSignIn />} />
								<Route
									path={process.env.ROUTE_SiGN_UP}
									element={<SsoRouteSignUp />} />
								<Route
									path={process.env.ROUTE_RECOVERY}
									element={<SsoRouteRecovery />} />
								<Route
									path={process.env.ROUTE_RESET}
									element={<SsoRouteReset />} />
								<Route
									path={process.env.ROUTE_VERIFY}
									element={<SsoRouteVerify />} />
								<Route
									path={`${process.env.ROUTE_AUTHED}/*`}
									element={<LayoutApp>
										<Sso />
										<DataType />
									</LayoutApp>}>
									<Route
										index
										element={<RouteAuthedDashboard />} />
								</Route>
								<Route
									path="*"
									element={<RouteSystemNotFound />} />*/}
							</Route>
						</Routes>
					</BrowserRouter>
				</ProviderLanguage>
			</SnackbarProvider>
		</ProviderTheme>
		<GlobalStyles />
	</ProviderStore>
</ContextProps.Provider>);
