import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ButtonLink from '@nest-datum-ui/components/Button/Link';

let Create = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Button
			disableElevation
			variant="contained"
			color="secondary"
			size="small"
			startIcon={<AddIcon />}
			component={ButtonLink}
			{ ...props }>
			{children ?? 'Create'}
		</Button>
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
};
Create.propTypes = {
};

export default Create;
