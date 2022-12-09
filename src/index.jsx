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
import LayoutApp from 'layouts/App';
import LayoutAppService from 'layouts/App/Service';
import SSORouteSignIn from '@nest-datum-ui-lib/sso/routes/SignIn';
import SSORouteSignUp from '@nest-datum-ui-lib/sso/routes/SignUp';
import SSORouteRecovery from '@nest-datum-ui-lib/sso/routes/Recovery';
import SSORouteReset from '@nest-datum-ui-lib/sso/routes/Reset';
import SSORouteVerify from '@nest-datum-ui-lib/sso/routes/Verify';
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
									element={<SSORouteSignIn />} />
								<Route
									path="sign-up"
									element={<SSORouteSignUp />} />
								<Route
									path="recovery"
									element={<SSORouteRecovery />} />
								<Route
									path="reset"
									element={<SSORouteReset />} />
								<Route
									path="verify"
									element={<SSORouteVerify />} />
								<Route
									path=""
									element={<LayoutApp />}>
									<Route
										index
										element={<RouteAppDashboard />} />
									<Route
										path=":serviceKey/*"
										element={<LayoutAppService />} />
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
