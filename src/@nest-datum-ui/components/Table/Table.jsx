import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TableContainer from '@mui/material/TableContainer';
import MuiTable from '@mui/material/Table';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledBoxWrapper from './StyledBoxWrapper.jsx';

let Table = ({ 
	onMassSelect,
	onMassDelete,
	isSelected,
	children 
}) => {
	const [ defaultChecked ] = React.useState(() => isSelected);

	return <React.Fragment>
		<StyledBoxWrapper>
			{(typeof onMassSelect === 'function')
				? <Grid
					container
					alignItems="center">
					<Grid
						item
						xs={false}>
						<FormControlLabel 
							control={<Checkbox 
								defaultChecked={defaultChecked}
								onChange={onMassSelect} />} 
							label="Select all" />
					</Grid>
					{isSelected
						? <React.Fragment>
							{(typeof onMassDelete === 'function')
								? <Grid
									item
									xs={false}>
									<Button
										disableElevation
										color="error"
										size="small"
										startIcon={<DeleteIcon />}
										onClick={onMassDelete}>
										Delete selected
									</Button>
								</Grid>
								: <React.Fragment />}
						</React.Fragment>
						: <React.Fragment />}
				</Grid>
				: <React.Fragment />}
			<TableContainer>
				<MuiTable>
					{children}
				</MuiTable>
			</TableContainer>
		</StyledBoxWrapper>
	</React.Fragment>;
};

Table = React.memo(Table);
Table.defaultProps = {
	isSelected: false,
};
Table.propTypes = {
	isSelected: PropTypes.bool,
	onMassSelect: PropTypes.func,
	onMassDelete: PropTypes.func,
};

export default Table;
