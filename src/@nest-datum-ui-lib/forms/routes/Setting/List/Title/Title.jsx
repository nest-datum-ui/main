import React from 'react';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.js';

let Title = () => {
	React.useEffect(() => hooksSetBreadcrumbs(), [
	]);

	return <React.Fragment>
		<Box 
			pt={1}
			pb={2}>
			<TypographyTitleRoute>
				Settings list
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
