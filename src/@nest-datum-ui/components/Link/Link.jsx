import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { fireShow as actionLoaderShow } from '@nest-datum-ui/components/Store/loader/actions/show.js';
import { fireHide as actionLoaderHide } from '@nest-datum-ui/components/Store/loader/actions/hide.js';

let timeout;
let Link = ({ 
	onClick = () => {},
	disableUnmountFlag,
	...props
}, ref) => {
	const onHandle = React.useCallback((e) => {
		if (!disableUnmountFlag) {
			actionLoaderShow('unmount')();
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				actionLoaderHide('unmount')();
			}, 600);
		}
		onClick(e);
	}, [
		onClick,
		disableUnmountFlag,
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
