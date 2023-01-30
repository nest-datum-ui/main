import React from 'react';
import PropTypes from 'prop-types';
import utilsCheckNumeric from '@nest-datum-ui/utils/check/numeric';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MiuSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiPagination from '@mui/material/Pagination';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import FormSearch from '@nest-datum-ui/components/Form/Search';
import SelectLimit from '@nest-datum-ui/components/Select/Limit';

let Select = ({
	shrink,
	multiple,
	variant,
	name,
	value,
	defaultValue,
	required,
	disabled,
	label,
	helperText,
	error,
	loader,
	children,
	total,
	page,
	limit,
	onChangePage,
	onLimit,
	onSearch,
	...props
}) => {
	return <React.Fragment>
		<Box
			width="100%" 
			position="relative">
			<FormControl 
				fullWidth 
				variant={variant}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}>
				<InputLabel
					shrink={shrink} 
					id={name} 
					size="small">
					{label}
				</InputLabel>
				<MiuSelect
					size="small"
					{ ...props }
					multiple={multiple}
					labelId={name}
					label={label}
					{ ...(typeof value === 'number' || typeof value === 'string' || (multiple && Array.isArray(value)))
						? { value }
						: ((typeof defaultValue === 'number' || typeof defaultValue === 'string' || (multiple && Array.isArray(defaultValue)))
							? { defaultValue }
							: { defaultValue: '' }) }>
					{loader
						? <MenuItem 
							disabled
							sx={{
								opacity: '1 !important',
							}}>
							<Box
								width="100%"
								height="100%"
								display="flex"
								alignItems="center"
								justifyContent="center">
								<CircularProgress size={40} />
							</Box>
						</MenuItem>
						: ((utilsCheckNumeric(page) 
							&& utilsCheckNumeric(total) 
							&& utilsCheckNumeric(limit) 
							&& utilsCheckArr(children))
							? ([
								...(onSearch && !(page === 1 && total < limit))
									? [
										<FormSearch
											key="formSearch"
											name={`select-${name.toString()}-search`}
											onSearch={onSearch} />,
									]
									: [],
								...children.map((item) => {
									return <MenuItem 
										key={item.id}
										value={item.id}
										sx={{
											backgroundColor: item.active
												? 'rgba(200, 200, 200, .7)'
												: 'inherit',
										}}>
										{item.name}
									</MenuItem>;
								}),
								...(onChangePage || onLimit) && !(page === 1 && total < limit)
									? [
										<Grid
											key="MuiPagination"
											container
											alignItems="center"
											justifyContent="space-between"
											sx={{
												padding: '14px 8px 0px 0px',
											}}>
											{onChangePage
												&& <Grid
													item
													xs={true}>
													<MuiPagination 
														count={Math.ceil(total / limit)}
														page={page}
														onChange={onChangePage} />
												</Grid>}
											{onLimit
												&& <Grid
													item
													xs={false}
													sx={{
														minWidth: '90px',
													}}>
													<SelectLimit
														label="Limit"
														size="small"
														value={limit}
														onChange={onLimit} />
												</Grid>}
										</Grid>,
									]
									: [],
							])
							: children)}
				</MiuSelect>
				{(error || helperText)
					? <FormHelperText 
						error={!!error}
						sx={{
							marginLeft: 0,
						}}>
						{error || helperText}
					</FormHelperText>
					: <React.Fragment />}
			</FormControl>
		</Box>
	</React.Fragment>;
};

Select = React.memo(Select);
Select.defaultProps = {
	loader: false,
	variant: 'outlined',
};
Select.propTypes = {
	error: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
	onChange: PropTypes.func,
	loader: PropTypes.bool,
	onChangePage: PropTypes.func,
	onLimit: PropTypes.func,
	onSearch: PropTypes.func,
	children: PropTypes.array,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
};

export default Select;
