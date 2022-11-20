import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@nest-datum-ui/components/Select';

let DataType = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Select { ...props }>
			<MenuItem 
				key="text"
				value="text">
				Text
			</MenuItem>
		</Select>
	</React.Fragment>;
};

DataType = React.memo(DataType);
DataType.defaultProps = {
};
DataType.propTypes = {
};

export default DataType;
