import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Loader from '@nest-datum-ui/components/Loader';

let Save = ({
	loader,
	disabled,
	children,
	...props
}) => {
	return <Button
		disabled={loader || disabled}
		disableElevation
		variant="contained"
		startIcon={loader
			? <Loader
				visible
				wrapper={{
					sx: {
						padding: '0px',
					},
				}}
				sx={{
					minWidth: '24px',
					maxWidth: '24px',
					minHeight: '24px',
					maxHeight: '24px',
				}} />
			: <CheckIcon />}
		{ ...props }>
		{children}
	</Button>
};

Save = React.memo(Save);
Save.defaultProps = {
	children: 'Save',
};
Save.propTypes = {
	loader: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default Save;
