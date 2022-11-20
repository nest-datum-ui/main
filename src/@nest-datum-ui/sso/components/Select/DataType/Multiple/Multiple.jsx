import React from 'react';
import SelectMultiple from 'components/Select/Multiple';
import enumDataType from 'enum/dataType';

let Multiple = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<SelectMultiple { ...props }>
			{children
				? children
				: Object
					.keys(enumDataType)
					.map((key) => ({
						id: key,
						name: enumDataType[key].name(),
					}))}
		</SelectMultiple>
	</React.Fragment>;
};

Multiple = React.memo(Multiple);
Multiple.defaultProps = {
};
Multiple.propTypes = {
};

export default Multiple;
