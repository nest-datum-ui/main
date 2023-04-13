import React from 'react';
import TableTemplate from '../../Table/Template';
import StyledWrapper from './Styled/Wrapper.jsx';

let Template = (props) => {
	return <StyledWrapper>
		<TableTemplate />
	</StyledWrapper>;
};

Template = React.memo(Template);
Template.defaultProps = {
};
Template.propTemplates = {
};

export default Template;
