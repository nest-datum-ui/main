import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckObj from '@nest-datum-ui/utils/check/obj';

let Json = ({
	children,
	...props
}) => {
	let childrenParsed = children,
		output = [];

	try {
		childrenParsed = JSON.parse(children);
	}
	catch (err) {
	}

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
};

export default Json;