import React from 'react';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import TypographyCaption from '@nest-datum-ui/components/Typography/Caption';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.js';

let Title = () => {
	React.useEffect(() => hooksSetBreadcrumbs(), [
	]);

	return <React.Fragment>
		<Box pb={2}>
			<TypographyTitleRoute>
				Options
			</TypographyTitleRoute>
			<TypographyCaption>
				Managing additional roles of the current entity.
			</TypographyCaption>
		</Box>
	</React.Fragment>;
};

Title = React.memo(Title);
Title.defaultProps = {
};
Title.propTypes = {
};

export default Title;
