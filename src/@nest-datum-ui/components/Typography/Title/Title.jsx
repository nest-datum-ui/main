import React from 'react';
import Typography from '@mui/material/Typography';

let Title = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Typography
			component="div"
			variant="h6"
			{ ...props }>
			{children}
		</Typography>
	</React.Fragment>;
};

Title = React.memo(Title);
Title.defaultProps = {
};
Title.propTypes = {
};

export default Title;