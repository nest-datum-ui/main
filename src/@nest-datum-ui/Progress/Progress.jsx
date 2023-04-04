import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import StyledWrapper from './Styled/Wrapper.jsx';

let Progress = ({ 
	visible, 
	wrapperProps,
	children,
	className,
	...props
}) => {
	return <StyledWrapper { ...wrapperProps } visible={Number(visible)} className={className}>
		{children ?? <CircularProgress { ...props } />}
	</StyledWrapper>;
};

Progress = React.memo(Progress);
Progress.defaultProps = {
	visible: false,
	wrapperProps: {},
};
Progress.propTypes = {
	visible: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
};

export default Progress;
