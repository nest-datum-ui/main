import React from 'react';
import Typography from '@mui/material/Typography';
import StyledWrapper from './Styled/Wrapper.jsx';

let Cell = ({ children, ...props }) => {
	return <StyledWrapper key="main">
		<Typography { ...props }
			component="div"
			variant="caption"
			color="textSecondary">
			{children}
		</Typography>
	</StyledWrapper>;
};

Cell = React.memo(Cell);
Cell.defaultProps = {
};
Cell.propTypes = {
};

export default Cell;
