import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { fireShow as actionLoaderShow } from '@nest-datum-ui/components/Store/loader/actions/show.js';
import { fireHide as actionLoaderHide } from '@nest-datum-ui/components/Store/loader/actions/hide.js';

let timeout;
let Link = ({ 
	onClick = () => {},
	...props
}, ref) => {
	const onHandle = React.useCallback((e) => {
		actionLoaderShow('unmount')();
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			actionLoaderHide('unmount')();
		}, 600);
		onClick(e);
	}, [
		onClick,
	]);

	return <React.Fragment>
		<ReactRouterDomLink  
			{ ...props }
			ref={ref}
			onClick={onHandle} />
	</React.Fragment>;
};

Link = React.memo(React.forwardRef(Link));
Link.defaultProps = {
};
Link.propTypes = {
};

export default Link;
