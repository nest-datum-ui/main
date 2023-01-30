import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@nest-datum-ui/components/Dialog';
import ButtonSave from '@nest-datum-ui/components/Button/Save';

let Drop = ({
	loader,
	onHandle,
	children,
	...props
}) => {
	return <React.Fragment>
		<Dialog 
			loader={loader}
			title="Remove option?"
			actions={<ButtonSave
				loader={loader}
				onClick={onHandle}>
				OK
			</ButtonSave>}
			{ ...props }>
			{children 
				?? <DialogContentText>
					Are you sure you want to delete the current option? This operation is irreversible and may compromise data integrity.
				</DialogContentText>}
		</Dialog>
	</React.Fragment>;
};

Drop = React.memo(Drop);
Drop.defaultProps = {
	onHandle: () => {},
};
Drop.propTypes = {
	onHandle: PropTypes.func.isRequired,
	loader: PropTypes.bool,
};

export default Drop;