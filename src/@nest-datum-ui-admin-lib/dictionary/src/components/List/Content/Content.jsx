import React from 'react';
import TableContent from '../../Table/Content';
import StyledWrapper from './Styled/Wrapper.jsx';

let Content = (props) => {
	return <StyledWrapper>
		<TableContent />
	</StyledWrapper>;
};

Content = React.memo(Content);
Content.defaultProps = {
};
Content.propContents = {
};

export default Content;
