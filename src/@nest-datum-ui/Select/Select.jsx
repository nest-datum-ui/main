import React from 'react';
import PropTypes from 'prop-types';
import {
	numeric as utilsCheckNumeric,
	arr as utilsCheckArr,
	arrFilled as utilsCheckArrFilled,
	str as utilsCheckStr,
	obj as utilsCheckObj,
	exists as utilsCheckExists,
} from '@nest-datum-utils/check';
import FormControl from '@mui/material/FormControl';
import MiuSelect from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
// import Pagination from '@nest-datum-ui/Pagination';
import ProgressSelect from '@nest-datum-ui/Progress/Select';
// import FormSearch from '@nest-datum-ui/Form/Search';
import StyledWrapper from './Styled/Wrapper.jsx';
import StyledMenuItem from './Styled/MenuItem.jsx';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

let Select = ({
	storeName,
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
	onChange,
	onChangePage,
	onLimit,
	onSearch,
	className,
	labelProps,
	form,
	...props
}) => {
	const [ display, setDisplay ] = React.useState(() => true);
	const [ valueInit, setValueInit ] = React.useState(() => value || defaultValue);
	// const showPagination = !(page === 1 && total < limit);
	const onChangeWrapper = React.useCallback((e) => {
		setValueInit(e.target.value);
		onChange(e, {
			props: {
				value: e.target.value,
				total,
				page,
				limit,
			}
		});
	}, [
		onChange,
		total,
		page,
		limit,
	]);
	const valueProcessed = {
		...(utilsCheckNumeric(value) 
			|| utilsCheckStr(value)
			|| multiple)
			? { 
				value: (utilsCheckArr(value)
					&& (Boolean(loader) || !utilsCheckArr(children)))
					? '' 
					: (value ?? []), 
			}
			: {},
		...(utilsCheckNumeric(defaultValue)
			|| utilsCheckStr(defaultValue)
			|| (multiple && utilsCheckArr(defaultValue)))
			? { 
				defaultValue: (Boolean(loader) || !utilsCheckArr(children)) 
				? '' 
				: defaultValue, 
			}
			: { 
				defaultValue: '', 
			}
	};

	if (utilsCheckExists(valueProcessed['value']) && utilsCheckExists(valueProcessed['defaultValue'])) {
		delete valueProcessed['defaultValue'];

		if (!utilsCheckArrFilled(children)) {
			valueProcessed['value'] = multiple
				? []
				: '';
		}
	}

	React.useEffect(() => {
		if (value 
			&& valueInit === undefined
			&& value !== valueInit) {
			setDisplay(false);
			setValueInit(value);
		}
	}, [
		value,
		valueInit,
	]);

	React.useEffect(() => {
		if (!display && value) {
			setDisplay(true);
			setValueInit(value);
		}
	}, [
		display,
		value,
		setValueInit,
		setDisplay,
	]);
	
	return <StyledWrapper className={className}>
		{display
			&& <FormControl 
				fullWidth 
				variant={variant}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}>
				{(label 
					&& (!labelProps['disableAnimation']
						|| (labelProps['disableAnimation'] === true && !valueInit)))
					&& <InputLabel
						shrink={shrink} 
						id={name} 
						size="small"
						{ ...labelProps }>
						{label}
					</InputLabel>}
				<MiuSelect
					size="small"
					{ ...form
						? { inputProps: { form } }
						: {} }
					{ ...props }
					multiple={multiple}
					labelId={name}
					label={label}
					onChange={onChangeWrapper}
					{ ...valueProcessed }>
					<ProgressSelect 
						key="selectLoader"
						visible={loader} />
					{(!Boolean(loader) && utilsCheckArr(children))
						&& ([
							// ...(onSearch && showPagination)
							// 	? [ <FormSearch
							// 			key="selectSearch"
							// 			name={`select-${name.toString()}-search`}
							// 			onSearch={onSearch} /> ]
							// 	: [],
							...children.map((item, index) => (utilsCheckObj(item)
								&& typeof item['$$typeof'] === 'symbol')
									? item
									: <StyledMenuItem 
										key={item.id ?? index}
										value={item.id}
										active={item.active}>
										{!multiple ?
											item.title
											:
											<React.Fragment>
												<ListItemText primary={item.title} />
												<Checkbox checked={value?.slice(-1)[0]?.indexOf(item.id) > -1} icon={props.checkboxicon} checkedIcon={props.checkboxcheckedicon}/>
											</React.Fragment>
										}
									</StyledMenuItem>),
							// ...((onChangePage || onLimit) && showPagination)
							// 	? [ <Pagination
							// 		key="selectPagination"
							// 		total={total}
							// 		page={page}
							// 		limit={limit}
							// 		onChange={onChangePage}
							// 		onLimit={onLimit} /> ]
							// 	: [],
						])}
				</MiuSelect>
				{!!(error || helperText)
					&& <FormHelperText className="select__error_wrapper" error={!!error}>
						{error || helperText}
					</FormHelperText>}
			</FormControl>}
	</StyledWrapper>;
};

Select = React.memo(Select);
Select.defaultProps = {
	loader: false,
	variant: 'outlined',
	labelProps: {},
	onChange: () => {},
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
	loader: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.bool,
	]),
	onChangePage: PropTypes.func,
	onLimit: PropTypes.func,
	onSearch: PropTypes.func,
	children: PropTypes.array,
	total: PropTypes.number,
	page: PropTypes.number,
	limit: PropTypes.number,
	name: PropTypes.string.isRequired,
	labelProps: PropTypes.object,
};

export default Select;
