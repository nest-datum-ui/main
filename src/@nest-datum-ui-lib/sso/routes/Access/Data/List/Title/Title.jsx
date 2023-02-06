import React from 'react';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.js';

let Title = () => {
	React.useEffect(() => hooksSetBreadcrumbs(), [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<TypographyTitleRoute>
				Accesses list
			</TypographyTitleRoute>
		</Box>
	</React.Fragment>;
};

Title = React.memo(Title);
Title.defaultProps = {
};
Title.propTypes = {
};

export default Title;
