import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MAIL_PATH_LETTER_STATUS } from '@nest-datum-ui-lib/mail/consts/path.js';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import Box from '@mui/material/Box';
import TypographyTitleRoute from '@nest-datum-ui/components/Typography/Title/Route';
import hooksSetBreadcrumbs from './hooks/setBreadcrumbs.jsx';

let Title = () => {
	const { entityId } = useParams();
	const isDeleted = useSelector(selectorMainExtract([ 'api', 'form', MAIL_PATH_LETTER_STATUS, 'isDeleted' ]));
	
	React.useEffect(() => hooksSetBreadcrumbs(entityId, isDeleted), [
		entityId,
		isDeleted,
	]);

	return <React.Fragment>
		<Box pb={2}>
			<TypographyTitleRoute
				entityId={entityId}
				isDeleted={isDeleted}
				defaultContent="Add status">
				Edit status
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
