import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@nest-datum-ui/components/Select';

let Multiple = ({
	name,
	children,
	value,
	defaultValue,
	onChange,
	...props
}) => {
	const [ valueState, setValueState ] = React.useState(() => (Array.isArray(value)
		? value
		: (Array.isArray(defaultValue)
			? defaultValue
			: [])));
	const valueLength = (value || []).length;
	const valueStateLength = (valueState || []).length;
	const onChangeState = React.useCallback((e, newValue) => {
		setValueState((currentState) => {
			currentState = Array.isArray(currentState)
				? currentState
				: [];

			const existsIndex = currentState.findIndex((item) => item.value === newValue.props.value);

			if (existsIndex >= 0) {
				currentState.splice(existsIndex, 1);
			}
			else {
				currentState.push({
					value: newValue.props.value,
					text: newValue.props.children,
				});
			}
			onChange(e, [ ...currentState ]);

			return currentState;
		});
	}, [
		setValueState,
		onChange,
	]);

	React.useEffect(() => {
		if (Array.isArray(value)
			&& valueLength !== valueStateLength
			&& Array.isArray(children)
			&& children.length > 0) {
			setValueState(value);
		}
	}, [
		value,
		valueLength,
		valueStateLength,
		children,
	]);

	return <React.Fragment>
		<Select 
			multiple
			size="small"
			onChange={onChangeState}
			name={name}
			renderValue={() => valueState.map((item, index) => {
				return <React.Fragment key={item.value}>
					{item.text}
					{(valueState.length - 1 > index)
						? ','
						: ''}
				</React.Fragment>;
			})}
			shrink={(valueState.length > 0)}
			{ ...value
				? { value: valueState }
				: (defaultValue
					? { defaultValue: valueState }
					: { defaultValue: [] }) }
			{ ...props }>
			{(children && Array.isArray(children))
				? children.map((item, i) => {
					const selectedIndex = valueState.findIndex((itemValue) => itemValue.value === item.id)

					return <MenuItem 
						key={item.id}
						value={item.id}
						sx={{
							backgroundColor: (selectedIndex >= 0)
								? '#EFEFEF'
								: 'inherit',
						}}>
						{item.name}
					</MenuItem>;
				})
				: ([])}
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
