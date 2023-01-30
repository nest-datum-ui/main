import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

let Icon = (props) => {
	return <React.Fragment>
		<IconButton { ...props }>
			<CloseIcon color="error" />
		</IconButton>
	</React.Fragment>;
};

Icon = React.memo(Icon);
Icon.defaultProps = {
};
Icon.propTypes = {
};

export default Icon;