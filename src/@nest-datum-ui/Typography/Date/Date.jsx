import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';

let TypographyDate = ({
	pattern,
	children,
	...props
}) => {
	return <React.Fragment>
		<Typography component="div">
			{format(new Date(children), pattern)}
		</Typography>
	</React.Fragment>;
};

TypographyDate = React.memo(TypographyDate);
TypographyDate.defaultProps = {
	pattern: 'dd MMMM, hh:mm',
};
TypographyDate.propTypes = {
	pattern: PropTypes.string,
	children: PropTypes.string.isRequired,
};

export default TypographyDate;
