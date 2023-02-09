import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Loader from '@nest-datum-ui/components/Loader';
import ButtonSave from '@nest-datum-ui/components/Button/Save';
import ButtonDrop from '@nest-datum-ui/components/Button/Drop';

let Form = ({ 
	onSubmit,
	onDrop, 
	loader,
	isDeleted,
	showDropButton,
	children,
}) => {
	return <React.Fragment>
		<Loader	visible={loader} />
		<form 
			onSubmit={onSubmit}
			style={{
				display: loader
					? 'none'
					: 'initial',
			}}>
			{children}
			<Grid
				container
				spacing={1}
				alignItems="center"
				justifyContent="flex-end"
				sx={{
					paddingTop: '48px',
				}}>
				<Grid
					item
					xs={false}>
					<ButtonSave
						type="submit"
						loader={loader} />
				</Grid>
				{showDropButton
					? <Grid
						item
						xs={false}>
						<ButtonDrop
							variant="contained"
							loader={loader}
							isDeleted={isDeleted}
							onClick={onDrop} />
					</Grid>
					: <React.Fragment />}
			</Grid>
		</form>
	</React.Fragment>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onDrop: PropTypes.func,
	loader: PropTypes.bool,
	isDeleted: PropTypes.bool,
	showDropButton: PropTypes.bool,
};

export default Form;
