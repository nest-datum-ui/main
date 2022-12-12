import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

let InputFile = ({ 
	name,
	label, 
	helperText,
	value,
	defaultValue,
	onChange,
}) => {
	const [ loaclValue, setLocalValue ] = React.useState(() => value || defaultValue || '');
	const [ updateFlag, setUpdateFlag ] = React.useState(() => false);
	const onFile = React.useCallback((e) => {
		const reader = new FileReader();

		reader.readAsDataURL(e.target.files[0]);
		reader.addEventListener('load', (e) => {
			onChange({
				target: {
					value: e.target.result,
					currentValue: e.target.result,
				}
			});
			setLocalValue(e.target.result);
			setUpdateFlag(true);
		});
	}, [
		onChange,
		setLocalValue,
	]);

	return <React.Fragment>
		<Box>
			{label
				? <Box pb={helperText
					? 1
					: 2}>
					<Typography
						component="div"
						variant="h6">
						{label}
					</Typography>
				</Box>
				: <React.Fragment />}
			{helperText
				? <Box pb={2}>
					<Typography	component="div">
						{helperText}
					</Typography>
				</Box>
				: <React.Fragment />}
			<Box pb={2}>
				<Button
					disableElevation
					component="label"
					variant="contained"
					color="primary"
					startIcon={<InsertDriveFileIcon />}>
					Select file
					{/*accept="image/png, image/jpeg"*/}
					<input 
						id={`input-file-${name}`}
						name={name}
						type="file"
						onChange={onFile}
						style={{
							display: 'none',
						}} />
				</Button>
			</Box>
			<Box
				width="70%"
				sx={{
					...loaclValue
						? {
							backgroundImage: `url('${updateFlag
								? loaclValue
								: (process.env.SERVER_API_STORAGE_URL + loaclValue)}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
						}
						: {},
					'&:after': {
						content: '""',
						display: 'block',
						paddingBottom: loaclValue
							? '70%'
							: '0px',
					},
				}} />
		</Box>
	</React.Fragment>;
};

InputFile = React.memo(InputFile);
InputFile.defaultProps = {
	onChange: () => {},
};
InputFile.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	name: PropTypes.string.isRequired,
};

export default InputFile;
