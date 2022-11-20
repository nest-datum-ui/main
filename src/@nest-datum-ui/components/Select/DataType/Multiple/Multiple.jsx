import React from 'react';
import SelectMultiple from '@nest-datum-ui/components/Select/Multiple';

const data = {
	text: {
		name: 'Text',
	},
};
let Multiple = ({
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

Multiple = React.memo(Multiple);
Multiple.defaultProps = {
};
Multiple.propTypes = {
};

export default Multiple;
