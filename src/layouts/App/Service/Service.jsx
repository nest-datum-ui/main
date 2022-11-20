import React from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '@nest-datum-ui/components/Loader';

let Component,
	timeout;
let Service = () => {
	const location = useLocation();
	const serviceKey = location.pathname.split('/')[1] || '';
	const [ mount, setMount ] = React.useState(() => false);

	React.useEffect(() => {
		setMount(false);
		clearTimeout(timeout);

		timeout = setTimeout(async () => {
			if (serviceKey) {
				switch (serviceKey) {
					case 'logs':
						Component = (await import('@nest-datum-ui/logs') || {})['default'];
						break;
					case 'mail':
						Component = (await import('@nest-datum-ui/mail') || {})['default'];
						break;
					case 'data-type':
						Component = (await import('@nest-datum-ui/data-type') || {})['default'];
						break;
					case 'registry':
						Component = (await import('@nest-datum-ui/registry') || {})['default'];
						break;
					case 'http':
						Component = (await import('@nest-datum-ui/http') || {})['default'];
						break;
					case 'sso':
						Component = (await import('@nest-datum-ui/sso') || {})['default'];
						break;
					default:
						Component = (await import('@nest-datum-ui/pages/NotFound') || {})['default'];
						break;
				}
				setMount(true);
			}
		}, 0);
	}, [
		serviceKey,
		setMount,
	]);

	return <React.Fragment>
		<Loader 
			visible={(!serviceKey
				|| !Component
				|| !mount)} />
		{(serviceKey
			&& Component
			&& mount)
			? <React.Fragment>
				<React.Suspense fallback={<React.Fragment />}>
					<Component />
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

export default Service;
