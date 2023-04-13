import React from 'react';
import TableReport from '../../Table/Report';
import StyledWrapper from './Styled/Wrapper.jsx';

let Report = (props) => {
	return <StyledWrapper>
		<TableReport />
	</StyledWrapper>;
};

Report = React.memo(Report);
Report.defaultProps = {
};
Report.propReports = {
};

export default Report;
