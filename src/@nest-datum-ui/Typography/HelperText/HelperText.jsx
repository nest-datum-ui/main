import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import StyledWrapper from './Styled/Wrapper.jsx';

let HelperText = ({
	error,
	helperText,
}) => {
	return (error || helperText)
		&& <StyledWrapper>
			{(error || helperText)
				&& <Typography error={error}>
					{error || helperText}
				</Typography>}
		</StyledWrapper>;
};

HelperText = React.memo(HelperText);
HelperText.defaultProps = {
};
HelperText.propTypes = {
	error: PropTypes.string,
	helperText: PropTypes.string,
};

export default HelperText;
