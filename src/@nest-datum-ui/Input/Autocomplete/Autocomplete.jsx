import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { createFilterOptions } from '@mui/material/Autocomplete';
import InputText from '../Text';
import Item from './Item';
import StyledWrapper from './Styled/Wrapper.jsx';

const filter = createFilterOptions();

let Autocomplete = ({ 
	storeName,
	id, 
	onChange, 
	onSelect, 
	onAdd, 
	onKeyDown,
	onBlur,
	clearOnChange,
	addNewValue, 
	value, 
	defaultValue, 
	ItemComponent, 
	AddItemComponent, 
	placeholder,
	label,
	error,
	helperText,
	name,
	...props 
}) => {
	const [ uniqueId ] = React.useState(() => id || uuidv4());
	const [ valueMemo, setValueMemo ] = React.useState(() => value || defaultValue || null);
	const [ open, setOpen ] = React.useState(() => false);
	const onChangeWrapper = React.useCallback((e, newValue, b, c) => {
		setValueMemo((currentState) => {
			onChange(e, newValue);

			if (clearOnChange) {
				setTimeout(() => setValueMemo(null), 0);
			}
			return newValue;
		});
	}, [
		onChange,
		setValueMemo,
		clearOnChange,
	]);
	const onSelectWrapper = React.useCallback((value, index, onClick) => (e) => {
		onClick(e);
		setOpen(false);
		onSelect(e, value, index);
	}, [
		onSelect,
		setOpen,
	]);
	const onAddWrapper = React.useCallback((value, index, onClick) => (e) => {
		onClick(e);
		setOpen(false);
		onAdd(e, value, index);
	}, [
		onAdd,
		setOpen,
	]);
	const onKeyDownWrapper = React.useCallback((e) => {
		const newValue = e.currentTarget.children[0].children[0].value;
		
		if (e.key === 'Enter') {
			setOpen(false);
			setValueMemo((currentState) => {
				onSelect(e, newValue);

				if (clearOnChange) {
					setTimeout(() => setValueMemo(null), 0);
				}
				return newValue;
			});
		}
		onKeyDown(e, newValue);
	}, [
		clearOnChange,
		setValueMemo,
		onSelect,
		onKeyDown,
		setOpen,
	]);
	const onBlurWrapper = React.useCallback((e) => {
		setOpen(false);
		onBlur(e);
	}, [
		onBlur,
		setOpen,
	]);
	const onOpen = React.useCallback((e) => setOpen(!!e.currentTarget.value), [
		setOpen,
	]);
	let filteredLastIndex = 0;

	return <StyledWrapper 
		id={uniqueId}
		open={open}
		onOpen={onOpen}
		onChange={onChangeWrapper}
		value={valueMemo}
		renderOption={({ onClick, ...props }, option, { inputValue, index }) => {
			return (index === filteredLastIndex)
				? <AddItemComponent {...props} onClick={onAddWrapper(inputValue, index, onClick)}>
					{option}
				</AddItemComponent>
				: <ItemComponent {...props} onClick={onSelectWrapper(option, index, onClick)}>
					{option}
				</ItemComponent>;
		}}
		renderInput={(params) => <InputText { ...params }
			id={uniqueId} 
			onBlur={onBlurWrapper}
			placeholder={placeholder}
			label={label}
			error={error}
			helperText={helperText}
			name={name}
			onKeyDown={onKeyDownWrapper} />} 
		{ ...addNewValue
			? {
				filterOptions: (options, params) => {
					const filtered = filter(options, params);
					const { inputValue } = params;

					// Suggest the creation of a new value
					const isExisting = options.some((option) => inputValue === option);

					if (inputValue !== '' && !isExisting) {
						filtered.push(inputValue);
						filteredLastIndex = filtered.length - 1;
					}
					return filtered;
				},
			}
			: {} }
		{ ...props } />;
};

Autocomplete = React.memo(Autocomplete);
Autocomplete.defaultProps = {
	freeSolo: true,
	clearOnEscape: true,
	clearOnBlur: false,
	clearOnChange: false,
	openOnFocus: false,
	selectOnFocus: false,
	addNewValue: false,
	handleHomeEndKeys: true,
	options: [],
	popupIcon: <React.Fragment />,
	clearIcon: <React.Fragment />,
	ItemComponent: Item,
	onChange: () => {},
	onSelect: () => {},
	onAdd: () => {},
	onKeyDown: () => {},
	onBlur: () => {},
};
Autocomplete.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	onAdd: PropTypes.func,
	onKeyDown: PropTypes.func,
	onBlur: PropTypes.func,
};

export default Autocomplete;
