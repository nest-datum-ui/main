import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FORMS_PATH_FIELD_OPTION } from '@nest-datum-ui-lib/forms/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.jsx';

let Title = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', FORMS_PATH_FIELD_OPTION, 'isDeleted' ]));
	
	React.useEffect(() => hooksSetBreadcrumbs(entityId, isDeleted), [
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box pb={2}>
			<TypographyTitleRoute
				entityId={entityId}
				isDeleted={isDeleted}
				defaultContent="Add option">
				Edit option
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
