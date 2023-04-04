import React from 'react';
import TableUser from '../../Table/User';
import StyledWrapper from './Styled/Wrapper.jsx';

let User = (props) => {
	return <StyledWrapper { ...props }>
		<TableUser />
	</StyledWrapper>;
};

User = React.memo(User);
User.defaultProps = {
};
User.propUsers = {
};

export default User;
