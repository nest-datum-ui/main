import React from 'react';
import { 
	arr as utilsCheckArr,
	arrFilled as utilsCheckArrFilled, 
} from '@nest-datum-utils/check';
import StyledWrapper from './Styled/Wrapper.jsx';
import handlerRenderValue from './handler/renderValue.jsx';
import handlerChangeState from './handler/changeState.js';

let Multiple = ({
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
	const renderValue = React.useCallback((selected) => handlerRenderValue(selected, children), [
		children,
	]);
	const onChangeState = React.useCallback((e, newValue) => handlerChangeState(e, newValue, setValueState, setOpen, onChange), [
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

	React.useEffect(() => {
		if (isAllowSet) {
			setValueState(value);
		}
	}, [
		isAllowSet,
		setValueState,
		value,
	]);

	return <StyledWrapper 
		multiple
		size="small"
		onChange={onChangeState}
		renderValue={renderValue}
		shrink={utilsCheckArrFilled(valueState)}
		open={open}
		onOpen={onOpen}
		onClose={onClose}
		{ ...props }
		{ ...value
			? { value: valueState }
			: (defaultValue
				? { defaultValue: valueState }
				: { defaultValue: [] }) }>
		{utilsCheckArr(children) && children}
	</StyledWrapper>;
};

Multiple = React.memo(Multiple);
Multiple.defaultProps = {
	onChange: () => {},
};
Multiple.propTypes = {
};

export default Multiple;
