import React from 'react';
import TableStatus from 'components/Table/Status';
import StyledWrapper from './Styled/Wrapper.jsx';

let Status = (props) => {
	return <StyledWrapper>
		<TableStatus />
	</StyledWrapper>;
};

Status = React.memo(Status);
Status.defaultProps = {
};
Status.propTypes = {
};

export default Status;
