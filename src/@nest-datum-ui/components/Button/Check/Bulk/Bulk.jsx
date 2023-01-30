import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ButtonDrop from '@nest-datum-ui/components/Button/Drop';

let Bulk = ({
	show,
	onClick,
	onDrop,
	storePath,
	length,
	...props
}) => {
	const selected = useSelector(selectorMainExtract([ ...storePath, 'selected' ])) || [];
	const checked = selected.length > 0 && selected.length === length;

	return show
		&& <React.Fragment>
			<Grid
				item
				xs={false}>
				<Grid
					container
					spacing={3}
					alignItems="center"
					justifyContent="flex-start">
					<Grid
						item
						xs={false}>
						<FormControlLabel 
							control={<Checkbox 
								{ ...(utilsCheckArr(storePath) && utilsCheckNumeric(length))
									? {	checked }
									: { defaultChecked: checked } }
								onChange={onClick}
								{ ...props } />} 
							label="Select all" />
					</Grid>
					{(selected.length > 0)
						&& <Grid
							item
							xs={false}>
							<ButtonDrop onClick={onDrop}>
								Delete checked
							</ButtonDrop>
						</Grid>}
				</Grid>
			</Grid>
		</React.Fragment>;
};

Bulk = React.memo(Bulk);
Bulk.defaultProps = {
	onClick: () => {},
	onDrop: () => {},
};
Bulk.propTypes = {
	show: PropTypes.bool,
	onClick: PropTypes.func,
	onDrop: PropTypes.func,
	storePath: PropTypes.array,
	length: PropTypes.number,
};

export default Bulk;
