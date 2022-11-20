import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import utilsUrlSearchPathItem from '@nest-datum-ui/utils/url/searchPathItem.js';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

let Sort = ({ 
	children,
	name,
	onChange, 
}) => {
	const location = useLocation();
	const sort = React.useMemo(() => utilsUrlSearchPathItem('sort', location.search, true) || {}, [
		location,
	]);
	const value = React.useMemo(() => (sort
		&& typeof sort === 'object'
		&& sort[name])
		? sort[name]
		: null, [
		name,
		sort,
	]);
	const onSort = React.useCallback((e) => {
		onChange((value === 'ASC')
			? null
			: ((value === 'DESC')
				? 'ASC'
				: 'DESC'));
	}, [
		onChange,
		value,
	]);

	return <React.Fragment>
		<TableCell>
			<Grid
				container
				spacing={1}
				alignItems="center">
				<Grid
					item
					xs="auto">
					{children}
				</Grid>
				<Grid
					item
					xs="auto">
					<IconButton 
						size="small"
						onClick={onSort}>
						{(value === 'ASC')
							? <ArrowDropUpIcon 
								fontSize="small"
								sx={{
									color: value
										? '#64B5F6'
										: 'initial',
								}} />
							: <ArrowDropDownIcon 
								fontSize="small"
								sx={{
									color: value
										? '#64B5F6'
										: 'initial',
								}} />}
					</IconButton>
				</Grid>
			</Grid>
		</TableCell>
	</React.Fragment>;
};

Sort = React.memo(Sort);
Sort.defaultProps = {
	onChange: (() => {}),
};
Sort.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string.isRequired,
};

export default Sort;
