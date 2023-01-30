import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '@nest-datum-ui/components/Loader';

let Drop = ({
	loader,
	disabled,
	isNotDelete,
	isDeleted,
	textDropPermanentlyButton,
	children,
	...props
}) => {
	return !isNotDelete &&
		<React.Fragment>
			<Button
				disabled={loader || disabled}
				disableElevation
				component="div"
				color="error"
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
					: <DeleteIcon />}
				{ ...props }>
				{isDeleted
					? textDropPermanentlyButton
					: children}
			</Button>
		</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	isNotDelete: false,
	isDeleted: false,
	textDropPermanentlyButton: 'Delete permanently',
	children: 'Delete',
};
Drop.propTypes = {
	isNotDelete: PropTypes.bool,
	isDeleted: PropTypes.bool,
	textDropPermanentlyButton: PropTypes.string,
	children: PropTypes.string,
};

export default Drop;
