import React from 'react';
import TableForm from '../../Table/Form';
import StyledWrapper from './Styled/Wrapper.jsx';

let Form = (props) => {
	return <StyledWrapper>
		<TableForm />
	</StyledWrapper>;
};

Form = React.memo(Form);
Form.defaultProps = {
};
Form.propForms = {
};

export default Form;
