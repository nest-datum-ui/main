import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Create = ({
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
			startIcon={<AddIcon />}
			{ ...to
				? { 
					to,
					component: ButtonLink,
				}
				: {} }
			{ ...props }>
			{children ?? 'Create'}
		</Button>
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
};
Create.propTypes = {
	to: PropTypes.string,
};

export default Create;
