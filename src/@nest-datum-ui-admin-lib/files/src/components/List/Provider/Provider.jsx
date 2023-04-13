import React from 'react';
import TableProvider from '../../Table/Provider';
import StyledWrapper from './Styled/Wrapper.jsx';

let Provider = (props) => {
	return <StyledWrapper>
		<TableProvider />
	</StyledWrapper>;
};

Provider = React.memo(Provider);
Provider.defaultProps = {
};
Provider.propProviders = {
};

export default Provider;
