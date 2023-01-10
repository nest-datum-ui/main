import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@nest-datum-ui/components/Table';
import Pagination from '@nest-datum-ui/components/Pagination';
import StyledBoxWrapper from './StyledBoxWrapper.jsx';

let TablePagination = ({ 
	withChangeLimit,
	total,
	page,
	limit,
	length,
	onChange,
	onLimit,
	onMassSelect,
	onMassDelete,
	isSelected,
	children, 
}) => {
	return <React.Fragment>
		<StyledBoxWrapper>
			{total >= 20
				? <Pagination
					withChangeLimit={withChangeLimit}
					total={total}
					page={page}
					limit={limit}
					onChange={onChange}
					onLimit={onLimit} />
				: <React.Fragment />}
			<Box pt={(typeof onMassSelect === 'function')
				? 2
				: 0}>
				<Table 
					onMassSelect={onMassSelect}
					onMassDelete={onMassDelete}
					isSelected={isSelected}>
					{children}
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
};

export default TablePagination;
