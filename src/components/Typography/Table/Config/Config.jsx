import React from 'react';
import PropTypes from 'prop-types';
import { bool as utilsCheckBool } from '@nest-datum-utils/check';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TypographyCaption from '../../Caption';

let Config = ({
	isRequired,
	isMultiline,
	regex,
	children,
	...props
}) => {
	return <React.Fragment>
		{utilsCheckBool(isMultiline)
			&& <Box pb={1}>
				<TypographyCaption>
					Fomat:
				</TypographyCaption>
				<Typography>
					{isMultiline
						? 'Multidimensional value'
						: 'Atomic value'}
				</Typography>
			</Box>}
		{utilsCheckBool(isRequired)
			&& <Box pb={1}>
				<TypographyCaption>
					Required:
				</TypographyCaption>
				<Typography>
					{isRequired
						? 'Required to fill'
						: 'Not required'}
				</Typography>
			</Box>}
		{regex
			&& <Box pb={1}>
				<TypographyCaption>
					Regex:
				</TypographyCaption>
				<Typography component="div">
					{String(regex)}
				</Typography>
			</Box>}
		{children
			&& <Typography component="div">
				{children}
			</Typography>}
	</React.Fragment>;
};

Config = React.memo(Config);
Config.defaultProps = {
};
Config.propTypes = {
	isRequired: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	isMultiline: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
	regex: PropTypes.string,
};

export default Config;
