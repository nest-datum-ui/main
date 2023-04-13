import React from 'react';
import TableLetter from '../../Table/Letter';
import StyledWrapper from './Styled/Wrapper.jsx';

let Letter = (props) => {
	return <StyledWrapper>
		<TableLetter />
	</StyledWrapper>;
};

Letter = React.memo(Letter);
Letter.defaultProps = {
};
Letter.propLetters = {
};

export default Letter;
