import { createRoot } from 'react-dom/client';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider as ProviderTheme } from '@nest-datum-ui/components/Theme';
import { Provider as ProviderStore } from '@nest-datum-ui/components/Store';
import { Provider as ProviderLanguage } from '@nest-datum-ui/components/Language';
import RouteNotFound from '@nest-datum-ui/routes/NotFound';
import RouteAppDashboard from '@nest-datum-ui/routes/App/Dashboard';
import Layout from 'layouts';
import LayoutManager from 'layouts/Manager';
import LayoutManagerService from 'layouts/Manager/Service';
import SsoRouteSignIn from '@nest-datum-ui-lib/sso/routes/SignIn';
import SsoRouteSignUp from '@nest-datum-ui-lib/sso/routes/SignUp';
import SsoRouteRecovery from '@nest-datum-ui-lib/sso/routes/Recovery';
import SsoRouteReset from '@nest-datum-ui-lib/sso/routes/Reset';
import SsoRouteVerify from '@nest-datum-ui-lib/sso/routes/Verify';
import GlobalStyles from './globalStyles.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
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
									path="sign-in"
									element={<SsoRouteSignIn />} />
								<Route
									path="sign-up"
									element={<SsoRouteSignUp />} />
								<Route
									path="recovery"
									element={<SsoRouteRecovery />} />
								<Route
									path="reset"
									element={<SsoRouteReset />} />
								<Route
									path="verify"
									element={<SsoRouteVerify />} />
								<Route
									path=""
									element={<LayoutManager />}>
									<Route
										index
										element={<RouteAppDashboard />} />
									<Route
										path=":serviceKey/*"
										element={<LayoutManagerService />} />
								</Route>
								<Route
									path="*"
									element={<RouteNotFound />} />*/}
							</Route>
						</Routes>
					</BrowserRouter>
				</ProviderLanguage>
			</SnackbarProvider>
		</ProviderTheme>
		<GlobalStyles />
	</ProviderStore>
);
