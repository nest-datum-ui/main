import React from 'react';
import PropTypes from 'prop-types';
import Button from '@nest-datum-ui/Button';
import StyledWrapper from './Styled/Wrapper.jsx';

let Group = ({ children, ...props }) => {
	return <StyledWrapper { ...props }>
		{children.map((item, index) => {
			const active = item.check.find((item) => item.flag);

			return <Button 
				key={index}
				{ ...active ? { to: active.to } : {} }>
				{item.text}
			</Button>;
		})}
	</StyledWrapper>;
};

Group = React.memo(Group);
Group.defaultProps = {
	disableElevation: true,
	variant: 'outlined',
	color: 'primary',
	size: 'small',
	children: [],
};
Group.propTypes = {
	children: PropTypes.array,
};

export default Group;
