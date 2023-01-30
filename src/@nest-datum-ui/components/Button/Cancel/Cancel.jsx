import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

let Cancel = (props) => {
	return <React.Fragment>
		<Button
			disableElevation
			variant="text"
			color="error"
			startIcon={<CloseIcon />}
			{ ...props }>
			Cancel
		</Button>
	</React.Fragment>;
};

Cancel = React.memo(Cancel);
Cancel.defaultProps = {
};
Cancel.propTypes = {
};

export default Cancel;