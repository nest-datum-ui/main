import React from 'react';
import Typography from '@mui/material/Typography';

let Subtitle = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Typography
			component="div"
			variant="subtitle2"
			color="textSecondary"
			{ ...props }>
			{children}
		</Typography>
	</React.Fragment>;
};

Subtitle = React.memo(Subtitle);
Subtitle.defaultProps = {
};
Subtitle.propTypes = {
};

export default Subtitle;