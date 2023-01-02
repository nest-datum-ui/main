import React from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '@nest-datum-ui/components/Loader';

let timeout;
let Service = ({ serviceKey }) => {
	const [ state, setState ] = React.useState(() => ({
		mount: false,
		Component: null,
	}));

	React.useEffect(() => {
		setState((currentState) => ({
			...currentState,
			mount: false,
		}));
		clearTimeout(timeout);

		timeout = setTimeout(async () => {
			if (serviceKey) {
				let Component;

				switch (serviceKey) {
					case 'cv':
						Component = (await import('@nest-datum-ui-lib/cv') || {})['default'];
						break;
					case 'forms':
						Component = (await import('@nest-datum-ui-lib/forms') || {})['default'];
						break;
					case 'files':
						Component = (await import('@nest-datum-ui-lib/files') || {})['default'];
						break;
					case 'logs':
						Component = (await import('@nest-datum-ui-lib/logs') || {})['default'];
						break;
					case 'mail':
						Component = (await import('@nest-datum-ui-lib/mail') || {})['default'];
						break;
					case 'data-type':
						Component = (await import('@nest-datum-ui-lib/data-type') || {})['default'];
						break;
					case 'registry':
						Component = (await import('@nest-datum-ui-lib/registry') || {})['default'];
						break;
					case 'http':
						Component = (await import('@nest-datum-ui-lib/http') || {})['default'];
						break;
					case 'sso':
						Component = (await import('@nest-datum-ui-lib/sso') || {})['default'];
						break;
					default:
						Component = (await import('@nest-datum-ui/routes/NotFound') || {})['default'];
						break;
				}
				setState((currentState) => ({
					mount: true,
					Component,
				}));
			}
		}, 0);
	}, [
		serviceKey,
		setState,
	]);

	return <React.Fragment>
		<Loader visible={!(!!state.Component && !!state.mount)} />
		{(!!state.Component && !!state.mount)
			? <React.Fragment>
				<React.Suspense fallback={<React.Fragment />}>
					<state.Component />
				</React.Suspense>
			</React.Fragment>
			: <React.Fragment />}
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
};
Service.propTypes = {
};

let ServiceWrapper = () => {
	const { pathname: locationPathname } = useLocation();
	const serviceKey = locationPathname.split('/')[1] || '';

	return <React.Fragment>
		<Loader visible={!serviceKey} />
		{serviceKey
			? <Service serviceKey={serviceKey} />
			: <React.Fragment />}
	</React.Fragment>;
};

ServiceWrapper = React.memo(ServiceWrapper);
ServiceWrapper.defaultProps = {
};
ServiceWrapper.propTypes = {
};

export default ServiceWrapper;
