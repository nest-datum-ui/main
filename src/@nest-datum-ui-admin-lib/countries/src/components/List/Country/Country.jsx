import React from 'react';
import TableCountry from '../../Table/Country';
import StyledWrapper from './Styled/Wrapper.jsx';

let Country = (props) => {
	return <StyledWrapper>
		<TableCountry />
	</StyledWrapper>;
};

Country = React.memo(Country);
Country.defaultProps = {
};
Country.propCountrys = {
};

export default Country;
