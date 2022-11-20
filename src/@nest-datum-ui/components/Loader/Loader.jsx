import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

let Loader = ({ 
	visible, 
	sx,
	wrapper,
}) => {
	return <React.Fragment>
		<Box
			py={6}
			width="100%"
			height="100%"
			display={visible
				? 'flex'
				: 'none'}
			alignItems="center"
			justifyContent="center"
			{ ...wrapper }>
			<CircularProgress
				sx={{
					minWidth: '160px',
					maxWidth: '160px',
					minHeight: '160px',
					maxHeight: '160px',
					...sx,
				}} />
		</Box>
	</React.Fragment>;
};

Loader = React.memo(Loader);
Loader.defaultProps = {
	sx: {},
	wrapper: {},
};
Loader.propTypes = {
	visible: PropTypes.bool,
};

export default Loader;
