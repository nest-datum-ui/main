import React from 'react';
import PropTypes from 'prop-types';
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
	children, 
}) => {
	return <React.Fragment>
		<StyledBoxWrapper>
			{length >= 20
				? <Pagination
					withChangeLimit={withChangeLimit}
					total={total}
					page={page}
					limit={limit}
					onChange={onChange}
					onLimit={onLimit} />
				: <React.Fragment />}
			<Table>
				{children}
			</Table>
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
	total: 0,
	page: 1,
	limit: 10,
	onChange: () => {},
};
TablePagination.propTypes = {
	withChangeLimit: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChange: PropTypes.func,
	onLimit: PropTypes.func,
};

export default TablePagination;
