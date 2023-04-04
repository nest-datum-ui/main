import React from 'react';
import PropTypes from 'prop-types';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import SelectLimit from '@nest-datum-ui/Select/Limit';
import StyledWrapper from './Styled/Wrapper.jsx';

let Pagination = ({ 
	withChangeLimit,
	total,
	page,
	limit,
	onChange,
	onLimit, 
	range,
	...props
}) => {
	return <StyledWrapper container { ...props }>
		<Grid
			item
			xs={false}>
			{utilsCheckFunc(onChange)
				&& <MuiPagination 
					count={Math.ceil(total / limit)}
					page={page}
					onChange={onChange} />}
		</Grid>
		{withChangeLimit && utilsCheckFunc(onLimit)
			&& <Grid
				item
				xs={2}>
				<SelectLimit
					label="Pagination"
					size="small"
					value={limit}
					onChange={onLimit}
					range={range} />
			</Grid>}
	</StyledWrapper>;
};

Pagination = React.memo(Pagination);
Pagination.defaultProps = {
	withChangeLimit: false,
	total: 0,
	page: 1,
	limit: 10,
	onChange: () => {},
	range: [
		5,
		10,
		20,
		50,
		100,
	],
};
Pagination.propTypes = {
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	onLimit: PropTypes.func,
	range: PropTypes.array,
	withChangeLimit: PropTypes.bool,
};

export default Pagination;
