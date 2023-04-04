import React from 'react';

const renderValue = (valueState, data) => {
	return valueState.map((value, index) => {
		return <React.Fragment key={value}>
			{data[index].title}
			{(valueState.length - 1 > index)
				? ','
				: ''}
		</React.Fragment>;
	});
};

export default renderValue;
