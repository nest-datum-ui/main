import React from 'react';
import { useSelector } from 'react-redux';
import { useServiceKey } from '@nest-datum-ui/utils/hooks';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Loader from '@nest-datum-ui/components/Loader';
import hooksAsyncLoad from './hooks/asyncLoad.js';

let Service = () => {
	const serviceKey = useServiceKey();
	const loader = useSelector(selectorMainExtract([ 'loader', 'window', 'visible' ]));
	const Component = useSelector(selectorMainExtract([ 'loader', 'window', 'data' ]));

	React.useEffect(() => hooksAsyncLoad(serviceKey), [
		serviceKey,
	]);

	return <React.Fragment>
		<Loader visible={loader && !Component} />
		{!(loader && !Component)
			&& <React.Suspense fallback={<React.Fragment />}>
				<Component />
			</React.Suspense>}
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
};
Service.propTypes = {
};

export default Service;