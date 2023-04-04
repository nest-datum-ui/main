import React from 'react';
import { useLocation } from 'react-router-dom';
import { hookUrlNavigate } from '@nest-datum-ui/Store';
import { str as utilsCheckStr } from '@nest-datum-utils/check';
import StyledWrapper from './Styled/Wrapper.jsx';

let Link = ({ 
	onClick = () => {},
	disableUnmountFlag,
	disableHref,
	to,
	active,
	children,
	...props
}, ref) => {
	const { pathname } = useLocation();
	const allowLinkFlag = utilsCheckStr(pathname)
		&& utilsCheckStr(to)
		&& pathname !== to;
	const onClickWrapper = React.useCallback((e) => {
		e.preventDefault();

		if (allowLinkFlag) {
			hookUrlNavigate(to, disableUnmountFlag);
		}
		onClick(e);
	}, [
		to,
		disableUnmountFlag,
		allowLinkFlag,
		onClick,
	]);

	return (!disableHref && allowLinkFlag && !active)
		? <a
			ref={ref}
			href={to}
			{ ...props }
			{ ...allowLinkFlag
				? { onClick: onClickWrapper }
				: {} }>
			{children}
		</a>
		: <StyledWrapper 
			{ ...props }
			{ ...disableHref
				? { onClick: onClickWrapper }
				: {} }
			component="span">
			<div>
				{children}
			</div>
		</StyledWrapper>;
};

Link = React.memo(React.forwardRef(Link));
Link.defaultProps = {
};
Link.propTypes = {
};

export default Link;
