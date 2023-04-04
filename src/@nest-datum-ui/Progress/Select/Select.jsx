import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../Progress.jsx';
import StyledWrapper from './Styled/Wrapper.jsx';

let Select = ({ visible }) => {
	return <StyledWrapper disabled>
		<Progress visible={visible} />
	</StyledWrapper>;
};

Select = React.memo(Select);
Select.defaultProps = {
	visible: false,
};
Select.propTypes = {
	visible: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
};

export default Select;
