import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../Progress.jsx';
import StyledWrapper from './Styled/Wrapper.jsx';

let Table = ({ visible, children }) => {
	return <StyledWrapper visible={Number(!!visible)}>
		{!!visible === false && children}
		<tr className="progress-table__tr-wrapper">
			<td className="progress-table__td-animation">
				<Progress visible={visible} />
			</td>
		</tr>
		<tr className="progress-table__tr-wrapper">
			<td className="progress-table__td-space" />
		</tr>
	</StyledWrapper>;
};

Table = React.memo(Table);
Table.defaultProps = {
	visible: false,
};
Table.propTypes = {
	visible: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
	]),
};

export default Table;
