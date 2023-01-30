import React from 'react';

const renderValue = (valueState) => {
	return valueState.map((item, index) => {
		return <React.Fragment key={item.value}>
			{item.text}
			{(valueState.length - 1 > index)
				? ','
				: ''}
		</React.Fragment>;
	});
};

export default renderValue;
