import React from 'react';
import TableField from '../../Table/Field';
import StyledWrapper from './Styled/Wrapper.jsx';

let Field = (props) => {
	return <StyledWrapper>
		<TableField />
	</StyledWrapper>;
};

Field = React.memo(Field);
Field.defaultProps = {
};
Field.propFields = {
};

export default Field;
