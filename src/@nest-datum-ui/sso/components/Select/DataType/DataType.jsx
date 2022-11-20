import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from 'components/Select';
import enumDataType from 'enum/dataType';

let DataType = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<Select { ...props }>
			{children
				? children
				: Object
					.keys(enumDataType)
					.map((key) => {
						return <MenuItem 
							key={key}
							value={key}>
							{enumDataType[key].name()}
						</MenuItem>
					})}
		</Select>
	</React.Fragment>;
};

DataType = React.memo(DataType);
DataType.defaultProps = {
};
DataType.propTypes = {
};

export default DataType;
