import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { strToObj as utilsFormatStrToObj } from '@nest-datum-utils/format';
import { obj as utilsCheckObj } from '@nest-datum-utils/check';

let Json = ({
	children,
	...props
}) => {
	let childrenParsed = utilsFormatStrToObj(children),
		output = [];

	if (utilsCheckObj(childrenParsed)) {
		if (utilsCheckObj(childrenParsed['content'])) {
			let key;

			for (key in childrenParsed['content']) {
				output.push(<Box 
					key={key}
					pb={1}>
					<Typography
						component="div"
						variant="body2"
						{ ...props }>
						<b>{key}:</b>
					</Typography>
					<Typography
						component="div"
						variant="body2"
						{ ...props }>
						{String(childrenParsed['content'][key])}
					</Typography>
				</Box>);
			}
			return output;
		}
		return <Typography
			component="div"
			variant="body2"
			{ ...props }>
			{String(children)}
		</Typography>;
	}
	return <Typography
		component="div"
		variant="body2"
		{ ...props }>
		{String(children)}
	</Typography>;
};

Json = React.memo(Json);
Json.defaultProps = {
};
Json.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.array,
	]),
};

export default Json;