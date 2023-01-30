import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import selectorMainExtract from '@nest-datum-ui/components/Store/main/selectors/extract.js';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Loader from '@nest-datum-ui/components/Loader';
import TablePagination from '@nest-datum-ui/components/Table/Pagination';
import TableCellSort from '@nest-datum-ui/components/Table/Cell/Sort';

let Primary = ({
	loader,
	children,
	...props
}) => {
	const unmount = useSelector(selectorMainExtract([ 'loader', 'unmount', 'visible' ]));
	const displayLoader = !utilsCheckArr(children) || unmount || loader;

	return <React.Fragment>
		<Loader visible={displayLoader} />
		{(!displayLoader)
			&& <React.Fragment>
				<TablePagination
					withChangeLimit
					loader={loader}
					length={children.length}
					{ ...props }>
					{children}
				</TablePagination>
			</React.Fragment>}
	</React.Fragment>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
	loader: PropTypes.bool,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	onChangePage: PropTypes.func.isRequired,
	onLimit: PropTypes.func.isRequired,
};

export default Primary;

