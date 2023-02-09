import React from 'react';
import PropTypes from 'prop-types';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Button from '@mui/material/Button';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Folder = ({
	children,
	to,
	...props
}) => {
	return <React.Fragment>
		<Button
			disableElevation
			variant="contained"
			color="secondary"
			size="small"
			startIcon={<CreateNewFolderIcon />}
			{ ...to
				? { 
					to,
					component: ButtonLink,
				}
				: {} }
			{ ...props }>
			{children ?? 'Create folder'}
		</Button>
	</React.Fragment>;
};

Folder = React.memo(Folder);
Folder.defaultProps = {
};
Folder.propTypes = {
	to: PropTypes.string,
	onClick: PropTypes.func,
};

export default Folder;
