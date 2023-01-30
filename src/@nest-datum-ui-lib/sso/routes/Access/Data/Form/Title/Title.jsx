import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SSO_PATH_ACCESS } from '@nest-datum-ui-lib/sso/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.jsx';

let Title = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', SSO_PATH_ACCESS, 'isDeleted' ]));
	
	React.useEffect(() => hooksSetBreadcrumbs(entityId, isDeleted), [
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box pb={2}>
			<TypographyTitleRoute
				entityId={entityId}
				isDeleted={isDeleted}
				defaultContent="Create new access">
				Edit access
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
