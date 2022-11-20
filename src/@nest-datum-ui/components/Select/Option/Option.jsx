import React from 'react';
import SelectMultiple from '@nest-datum-ui/components/Select/Multiple';

const data = {
	text: {
		name: 'Text',
	},
};
let Option = ({
	children,
	...props
}) => {
	return <React.Fragment>
		<SelectMultiple { ...props }>
			{children
				? children
				: Object
					.keys(data)
					.map((key) => ({
						id: key,
						name: data[key]['name'],
					}))}
		</SelectMultiple>
	</React.Fragment>;
};

Option = React.memo(Option);
Option.defaultProps = {
};
Option.propTypes = {
};

export default Option;
