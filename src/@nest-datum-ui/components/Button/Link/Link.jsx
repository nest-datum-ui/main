import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import handlersClickWithUnmountLoader from './handlers/clickWithUnmountLoader.js';

let Link = ({ 
	onClick = () => {},
	disableUnmountFlag,
	...props
}, ref) => {
	const onHandle = React.useCallback((e) => handlersClickWithUnmountLoader(e, disableUnmountFlag, onClick), [
		disableUnmountFlag,
		onClick,
	]);

	return <ReactRouterDomLink
		{ ...props }
		ref={ref}
		onClick={onHandle} />;
};

Link = React.memo(React.forwardRef(Link));
Link.defaultProps = {
};
Link.propTypes = {
};

export default Link;
