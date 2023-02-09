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
	displayButtons,
	displayLimit,
	range,
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
				{displayButtons
					&& <MuiPagination 
						count={Math.ceil(total / limit)}
						page={page}
						onChange={onChange} />}
			</Grid>
			{(withChangeLimit && displayLimit)
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
	displayButtons: true,
	displayLimit: true,
	range: [
		5,
		10,
		20,
		50,
		100,
	],
};
Pagination.propTypes = {
	withChangeLimit: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	onLimit: PropTypes.func,
	displayButtons: PropTypes.bool,
	displayLimit: PropTypes.bool,
	range: PropTypes.array,
};

export default Pagination;
