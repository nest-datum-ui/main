import React from 'react';
import Typography from '@mui/material/Typography';

let Caption = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Typography
			component="div"
			variant="caption"
			color="textSecondary"
			{ ...props }>
			{children}
		</Typography>
	</React.Fragment>;
};

Caption = React.memo(Caption);
Caption.defaultProps = {
};
Caption.propTypes = {
};

export default Caption;