import React from 'react';
import TableRole from '../../Table/Role';
import StyledWrapper from './Styled/Wrapper.jsx';

let Role = (props) => {
	return <StyledWrapper { ...props }>
		<TableRole />
	</StyledWrapper>;
};

Role = React.memo(Role);
Role.defaultProps = {
};
Role.propRoles = {
};

export default Role;
