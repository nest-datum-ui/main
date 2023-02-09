import React from 'react';
import PropTypes from 'prop-types';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from '@mui/material/Button';

let File = ({
	children,
	onChange,
	...props
}) => {
	return <React.Fragment>
		<Button
			disableElevation
			component="label"
			variant="contained"
			color="secondary"
			size="small"
			startIcon={<NoteAddIcon />}
			{ ...props }>
			{children ?? 'Upload file'}
			<input 
				multiple
				name="files"
				type="file"
				onChange={onChange}
				style={{
					display: 'none',
				}} />
		</Button>
	</React.Fragment>;
};

File = React.memo(File);
File.defaultProps = {
};
File.propTypes = {
	onClick: PropTypes.func,
	onChange: PropTypes.func,
};

export default File;
