import React from 'react';
import TableSystem from '../../Table/System';
import StyledWrapper from './Styled/Wrapper.jsx';

let System = (props) => {
	return <StyledWrapper>
		<TableSystem />
	</StyledWrapper>;
};

System = React.memo(System);
System.defaultProps = {
};
System.propSystems = {
};

export default System;
