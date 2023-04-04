import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Primary = ({ children, ...props }) => {
	return <StyledWrapper variant="outlined" { ...props }>
		{children}
	</StyledWrapper>;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
