import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

let Clear = (props) => {
	return <React.Fragment>
		<Button
			disableElevation
			color="error"
			startIcon={<CloseIcon />}
			{ ...props }>
			Clear
		</Button>
	</React.Fragment>;
};

Clear = React.memo(Clear);
Clear.defaultProps = {
};
Clear.propTypes = {
};

export default Clear;