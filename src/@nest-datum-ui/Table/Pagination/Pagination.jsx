import React from 'react';
import PropTypes from 'prop-types';
import { arr as utilsCheckArr } from '@nest-datum-utils/check';
import Pagination from '@nest-datum-ui/Pagination';
import Progress from '@nest-datum-ui/Progress';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';
import TableCell from '@nest-datum-ui/Table/Cell';
import TableCellSort from '../Cell/Sort';
import Typography from '@mui/material/Typography';
import Table from '../Table';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledNotEmpty from './Styled/NotEmpty.jsx';
import StyledEmpty from './Styled/Empty.jsx';

let TablePagination = ({ 
	bulkDeletion,
	withChangeLimit,
	loader,
	total,
	page,
	limit,
	length,
	onChange,
	onLimit,
	headRowCells,
	children,
	BottomComponent,
}) => {
	const loaderProcessed = (loader || !utilsCheckArr(children) || !(length >= 0));

	return <StyledWrapper>
		<Progress visible={loaderProcessed} />
		{(length > 0)
			? <StyledNotEmpty>
				{total >= 20
					&& <Pagination
						withChangeLimit={withChangeLimit}
						total={total}
						page={page}
						limit={limit}
						onChange={onChange}
						onLimit={onLimit} />}
				{(loaderProcessed === false && children)
					&& <Table bulkDeletion={bulkDeletion}>
						{utilsCheckArr(headRowCells)
							&& <TableHead>
								<TableRow>
									{bulkDeletion && <MuiTableCell padding="checkbox" />}
									{headRowCells.map((item) => item.sortable
										? <TableCellSort 
											key={item.id}
											name={item.name}
											onChange={item.onSort}>
											{item.name}
										</TableCellSort>
										: <TableCell key={item.id}>
											{item.name}
										</TableCell>)}
								</TableRow>
							</TableHead>}
						<TableBody>
							{children}
						</TableBody>
					</Table>}
				{(total > 5)
					&& <Pagination
						withChangeLimit={withChangeLimit}
						total={total}
						page={page}
						limit={limit}
						onChange={onChange}
						onLimit={onLimit} />}
			</StyledNotEmpty>
			: (loader === false)
				&& <StyledEmpty visible={Number(length === 0)}>
					<Typography
						variant="subtitle2"
						color="secondary">
						No entries created.
					</Typography>
				</StyledEmpty>}
		{BottomComponent && BottomComponent}
	</StyledWrapper>;
};

TablePagination = React.memo(TablePagination);
TablePagination.defaultProps = {
	withChangeLimit: false,
	isSelected: false,
	total: 0,
	page: 1,
	limit: 20,
	onChange: () => {},
	children: [],
};
TablePagination.propTypes = {
	withChangeLimit: PropTypes.bool,
	isSelected: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	onLimit: PropTypes.func,
	onMassDelete: PropTypes.func,
	onMassSelect: PropTypes.func,
	children: PropTypes.array,
};

export default TablePagination;
