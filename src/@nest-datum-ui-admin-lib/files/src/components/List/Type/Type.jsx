import React from 'react';
import TableType from '../../Table/Type';
import StyledWrapper from './Styled/Wrapper.jsx';

let Type = (props) => {
	return <StyledWrapper>
		<TableType />
	</StyledWrapper>;
};

Type = React.memo(Type);
Type.defaultProps = {
};
Type.propTypes = {
};

export default Type;
