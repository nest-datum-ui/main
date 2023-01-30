import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort from '@nest-datum-ui/components/Table/Cell/Sort';

let Status = ({
	bulkDeletion,
	loader,
	total,
	page,
	limit,
	onChangePage,
	onLimit,
	onSortId,
	onSortCreatedAt,
	children,
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const displayLoader = !utilsCheckArr(children) || unmount || loader;

	return <React.Fragment>
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					bulkDeletion={bulkDeletion}
					withChangeLimit
					loader={loader}
					total={total}
					page={page}
					limit={limit}
					length={(children || []).length ?? 0}
					onChange={onChangePage}
					onLimit={onLimit}
					headRowCells={[
						<TableCellSort 
							key="id"
							name="id"
							onChange={onSortId}>
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								ID
							</Typography>
						</TableCellSort>,
						<TableCell key="main">
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Main
							</Typography>
						</TableCell>,
						<TableCellSort
							key="createdAt"
							name="createdAt"
							onChange={onSortCreatedAt}>
							<Typography 
								component="div"
								variant="caption"
								color="textSecondary">
								Story
							</Typography>
						</TableCellSort>,
					]}>
					{children}
				</TablePagination>
			</React.Fragment>}
	</React.Fragment>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
	bulkDeletion: PropTypes.bool,
	loader: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChangePage: PropTypes.func.isRequired,
	onLimit: PropTypes.func.isRequired,
	onSortId: PropTypes.func.isRequired,
	onSortCreatedAt: PropTypes.func.isRequired,
};

export default Status;
