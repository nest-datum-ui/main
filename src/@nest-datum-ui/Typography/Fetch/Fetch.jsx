import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { 
	selectorMainArrayFind,
	actionQueueSet,
} from '@nest-datum-ui/Store';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Typography from '@mui/material/Typography';

let Fetch = ({
	apiUrl,
	label,
	children,
	...props
}) => {
	const data = useSelector(selectorMainArrayFind([ 'api', 'list', `queue_${apiUrl}`, 'data' ], (item) => item.id === children)) || {};
	const exists = Object.keys(data).length >= 1;

	React.useEffect(() => {
		if (!exists && utilsCheckStrId(children)) {
			actionQueueSet(apiUrl, children);
		}
	}, [
		exists,
		apiUrl,
		children,
	]);

	return <Typography component="div" { ...props }>
		{data[label] || data['name'] || children}
	</Typography>;
};

Fetch = React.memo(Fetch);
Fetch.defaultProps = {
};
Fetch.propTypes = {
	apiUrl: PropTypes.string.isRequired,
	label: PropTypes.string,
};

export default Fetch;