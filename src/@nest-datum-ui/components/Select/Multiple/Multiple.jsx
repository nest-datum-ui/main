import React from 'react';
import utilsCheckArr from '@nest-datum-ui/utils/check/arr';
import utilsCheckArrFilled from '@nest-datum-ui/utils/check/arr/filled.js';
import Select from '@nest-datum-ui/components/Select';
import handlersRenderValue from './handlers/renderValue.jsx';
import handlersChangeState from './handlers/changeState.js';
import hooksSetDefaultState from './hooks/setDefaultState.js';

let Multiple = ({
	multiple,
	children,
	value,
	defaultValue,
	onChange,
	...props
}) => {
	const [ open, setOpen ] = React.useState(() => false);
	const [ valueState, setValueState ] = React.useState(() => (utilsCheckArr(value)
		? value
		: (utilsCheckArr(defaultValue)
			? defaultValue
			: [])));
	const valueLength = (value || []).length;
	const valueStateLength = (valueState || []).length;
	const isAllowSet = utilsCheckArr(value)
		&& valueLength !== valueStateLength
		&& utilsCheckArrFilled(children);
	const renderValue = React.useCallback((selected) => handlersRenderValue(selected), [
	]);
	const onChangeState = React.useCallback((e, newValue) => handlersChangeState(e, newValue, setValueState, setOpen, onChange), [
		setValueState,
		setOpen,
		onChange,
	]);
	const onOpen = React.useCallback((e) => setOpen(true), [
		setOpen,
	]);
	const onClose = React.useCallback((e) => setOpen(false), [
		setOpen,
	]);

	React.useEffect(() => hooksSetDefaultState(isAllowSet, setValueState, value), [
		isAllowSet,
		setValueState,
		value,
	]);

	return <React.Fragment>
		<Select 
			multiple
			size="small"
			onChange={onChangeState}
			renderValue={renderValue}
			shrink={utilsCheckArrFilled(valueState)}
			open={open}
			onOpen={onOpen}
			onClose={onClose}
			{ ...value
				? { value: valueState }
				: (defaultValue
					? { defaultValue: valueState }
					: { defaultValue: [] }) }
			{ ...props }>
			{utilsCheckArr(children) && children}
		</Select>
	</React.Fragment>;
};

Multiple = React.memo(Multiple);
Multiple.defaultProps = {
	onChange: () => {},
};
Multiple.propTypes = {
};

export default Multiple;
