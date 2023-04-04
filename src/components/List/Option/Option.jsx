import React from 'react';
import TableOptions from 'components/Table/Options';
import StyledWrapper from './Styled/Wrapper.jsx';

let Options = (props) => {
	return <StyledWrapper>
		<TableOptions />
	</StyledWrapper>;
};

Options = React.memo(Options);
Options.defaultProps = {
};
Options.propTypes = {
};

export default Options;
