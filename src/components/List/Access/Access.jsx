import React from 'react';
import TableAccess from 'components/Table/Access';
import StyledWrapper from './Styled/Wrapper.jsx';

let Access = (props) => {
	return <StyledWrapper>
		<TableAccess />
	</StyledWrapper>;
};

Access = React.memo(Access);
Access.defaultProps = {
};
Access.propTypes = {
};

export default Access;
