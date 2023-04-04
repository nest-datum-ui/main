import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { hookUrlProperty } from '@nest-datum-ui/Store';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StyledWrapper from './Styled/Wrapper.jsx';

let Sort = ({ 
	children,
	name,
	onChange, 
}) => {
	const location = useLocation();
	const sort = React.useMemo(() => hookUrlProperty('sort', location.search, true) || {}, [
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
	const onSort = React.useCallback((e) => onChange((value === 'ASC')
		? null
		: ((value === 'DESC')
			? 'ASC'
			: 'DESC')), [
		onChange,
		value,
	]);
	const IconComponent = (value === 'ASC')
		? ArrowDropUpIcon
		: ArrowDropDownIcon;

	return <StyledWrapper>
		<Grid
			container
			spacing={1}
			alignItems="center">
			<Grid
				item
				xs="auto">
				<Typography
					component="div"
					variant="caption"
					color="textSecondary">
					{children}
				</Typography>
			</Grid>
			<Grid
				item
				xs="auto">
				<IconButton 
					size="small"
					onClick={onSort}>
					<IconComponent 
						fontSize="small"
						sx={{
							color: value
								? '#64B5F6'
								: 'initial',
						}} />
				</IconButton>
			</Grid>
		</Grid>
	</StyledWrapper>;
};

Sort = React.memo(Sort);
Sort.defaultProps = {
	onChange: () => {},
};
Sort.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string.isRequired,
};

export default Sort;
