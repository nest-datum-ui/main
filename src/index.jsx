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
import PageNotFound from '@nest-datum-ui/pages/NotFound';
import PageAppDashboard from '@nest-datum-ui/pages/App/Dashboard';
import Layout from 'layouts';
import LayoutApp from 'layouts/App';
import LayoutAppService from 'layouts/App/Service';
import SSOPageSignIn from '@nest-datum-ui/sso/pages/SignIn';
import SSOPageSignUp from '@nest-datum-ui/sso/pages/SignUp';
import SSOPageRecovery from '@nest-datum-ui/sso/pages/Recovery';
import SSOPageReset from '@nest-datum-ui/sso/pages/Reset';
import SSOPageVerify from '@nest-datum-ui/sso/pages/Verify';
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
									element={<SSOPageSignIn />} />
								<Route
									path="sign-up"
									element={<SSOPageSignUp />} />
								<Route
									path="recovery"
									element={<SSOPageRecovery />} />
								<Route
									path="reset"
									element={<SSOPageReset />} />
								<Route
									path="verify"
									element={<SSOPageVerify />} />
								<Route
									path=""
									element={<LayoutApp />}>
									<Route
										index
										element={<PageAppDashboard />} />
									<Route
										path=":serviceKey/*"
										element={<LayoutAppService />} />
								</Route>
								<Route
									path="*"
									element={<PageNotFound />} />*/}
							</Route>
						</Routes>
					</BrowserRouter>
				</ProviderLanguage>
			</SnackbarProvider>
		</ProviderTheme>
		<GlobalStyles />
	</ProviderStore>
);
