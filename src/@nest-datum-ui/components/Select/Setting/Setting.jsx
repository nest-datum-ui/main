import React from 'react';
import SelectMultiple from '@nest-datum-ui/components/Select/Multiple';

const data = {
	text: {
		name: 'Text',
	},
};
let Setting = ({
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

Setting = React.memo(Setting);
Setting.defaultProps = {
};
Setting.propTypes = {
};

export default Setting;
