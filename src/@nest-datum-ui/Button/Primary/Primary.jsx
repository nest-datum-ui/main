import React from 'react';
import StyledWrapper from './Styled/Wrapper.jsx';

let Primary = (props) => {
	return <StyledWrapper variant="contained" color="secondary" { ...props } />;
};

Primary = React.memo(Primary);
Primary.defaultProps = {
};
Primary.propTypes = {
};

export default Primary;
