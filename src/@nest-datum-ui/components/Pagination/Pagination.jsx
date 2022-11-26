import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import SelectLimit from '@nest-datum-ui/components/Select/Limit';

let Pagination = ({ 
	withChangeLimit,
	total,
	page,
	limit,
	onChange,
	onLimit, 
}) => {
	return <React.Fragment>
		<Grid
			container
			alignItems="center"
			justifyContent="space-between"
			className="table-pagination"
			sx={{
				paddingTop: '18px',
			}}>
			<Grid
				item
				xs={false}>
				<MuiPagination 
					count={Math.ceil(total / limit)}
					page={page}
					onChange={onChange} />
			</Grid>
			<Grid
				item
				xs={2}>
				{withChangeLimit
					? <SelectLimit
						label="Пагинация"
						size="small"
						value={limit}
						onChange={onLimit} />
					: <React.Fragment />}
			</Grid>
		</Grid>
	</React.Fragment>;
};

Pagination = React.memo(Pagination);
Pagination.defaultProps = {
	withChangeLimit: false,
	total: 0,
	page: 1,
	limit: 10,
	onChange: () => {},
};
Pagination.propTypes = {
	withChangeLimit: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	onLimit: PropTypes.func,
};

export default Pagination;
