import React from 'react';
import PropTypes from 'prop-types';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import Table from '@nest-datum-ui/components/Table';
import Pagination from '@nest-datum-ui/components/Pagination';
import StyledBoxWrapper from './StyledBoxWrapper.jsx';

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
}) => {
	return <React.Fragment>
		{(length > 0)
			? <StyledBoxWrapper>
				{total >= 20
					&& <Pagination
						withChangeLimit={withChangeLimit}
						total={total}
						page={page}
						limit={limit}
						onChange={onChange}
						onLimit={onLimit} />}
				<Box pt={bulkDeletion
					? 2
					: 0}>
					<Table bulkDeletion={bulkDeletion}>
						{utilsCheckArr(headRowCells)
							&& <TableHead>
								<TableRow>
									{bulkDeletion
										&& <TableCell padding="checkbox" />}
									{headRowCells}
								</TableRow>
							</TableHead>}
						{!loader
							? <TableBody>
								{children}
							</TableBody>
							: <tbody>
								<tr>
									<td 
										style={{
											position: 'absolute',
											width: '100%',
										}}>
										<Loader visible />
									</td>
								</tr>
								<tr>
									<td
										style={{
											height: '160px',
											minHeight: '160px',
											maxHeight: '160px',
											paddingTop: '48px',
											paddingBottom: '48px',
										}} />
								</tr>
							</tbody>}
					</Table>
				</Box>
				<Pagination
					withChangeLimit={withChangeLimit}
					total={total}
					page={page}
					limit={limit}
					onChange={onChange}
					onLimit={onLimit} />
			</StyledBoxWrapper>
			: <Box
				py={6}
				display="flex"
				justifyContent="center">
				<Typography
					variant="subtitle2"
					color="secondary">
					No entries created.
				</Typography>
			</Box>}
	</React.Fragment>;
};

TablePagination = React.memo(TablePagination);
TablePagination.defaultProps = {
	withChangeLimit: false,
	isSelected: false,
	total: 0,
	page: 1,
	limit: 10,
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
